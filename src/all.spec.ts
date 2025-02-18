import "reflect-metadata";
import mongoose from "mongoose";
import * as supertest from "supertest";
import { faker } from "@faker-js/faker";
import { expect } from "chai";
import UserModel, { IUser as User } from "./modules/users/models/UserModel";
import { RegionModel, Region } from "./modules/regions/models/RegionModel";
import server from "./app";
import { connectToDatabase, disconnectFromDatabase } from "./test/setup";

type RegionData = {
  user: mongoose.Types.ObjectId;
  name: string;
  coordinates: {
    type: "Polygon";
    coordinates: number[][][];
  };
};

describe("Integration Tests", () => {
  before(async () => {
    console.log("📦 Iniciando os testes...");
    await connectToDatabase();
    console.log("📦 Conexão com o MongoDB estabelecida.");
  });

  after(async () => {
    console.log("📦 Finalizando os testes...");
    await disconnectFromDatabase();
    console.log("📦 Conexão com o MongoDB encerrada.");
  });

  describe("Models", () => {
    let user: User;

    beforeEach(async () => {
      await UserModel.deleteMany({});
      await RegionModel.deleteMany({});

      user = await UserModel.create({
        name: faker.person.firstName(),
        email: faker.internet.email(),
        address: "Avenida Paulista, São Paulo",
      });
    });

    describe("UserModel", () => {
      it("should create a user with required fields", async () => {
        expect(user).to.have.property("_id");
        expect(user).to.have.property("name").that.is.a("string");
        expect(user).to.have.property("email").that.is.a("string");
        expect(user).to.have.property("address").that.is.a("string");
        expect(user).to.have.property("coordinates").that.is.an("array");
      });
    });

    describe("RegionModel", () => {
      it("should create a region", async () => {
        const regionData: RegionData = {
          name: "51",
          coordinates: {
            type: "Polygon",
            coordinates: [
              [
                [173.933, -35.239],
                [174.40343, -35.98525],
                [173.933, -35.89811],
                [173.933, -35.239],
              ],
            ],
          },
          user: user._id,
        };

        const [region] = await RegionModel.create([regionData]);

        expect(region.name).to.equal(regionData.name);
        expect(region.coordinates.type).to.equal(regionData.coordinates.type);
        expect(region.coordinates.coordinates[0]).to.deep.equal(
          regionData.coordinates.coordinates[0]
        );
        expect(region.user.toString()).to.equal(regionData.user.toString());
      });

      it("should rollback changes in case of failure", async () => {
        const initialRegionsCount = await RegionModel.countDocuments({
          user: user._id,
        });

        try {
          await RegionModel.create([{ user: user._id }]);
          throw new Error("Should have thrown an error");
        } catch (error) {
          const finalRegionsCount = await RegionModel.countDocuments({
            user: user._id,
          });
          expect(finalRegionsCount).to.equal(initialRegionsCount);
        }
      });
    });
  });

  describe("Routes", () => {
    let user: User;

    before(async () => {
      user = await UserModel.create({
        name: faker.person.firstName(),
        email: faker.internet.email(),
        address: "Avenida Paulista, São Paulo",
      });
      console.log("Usuário criado para os testes de rota:", user._id);
    });

    after(async () => {
      await UserModel.deleteMany({});
      await RegionModel.deleteMany({});
      console.log("Todos os usuários foram removidos após os testes.");
    });

    describe("GET /users", () => {
      it("should return a list of users", async () => {
        const response = await supertest(server).get("/api/users");
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");
        expect(response.body[0]).to.have.property("_id");
        expect(response.body[0]).to.have.property("name");
        expect(response.body[0]).to.have.property("email");
      });
    });

    describe("POST /users", () => {
      it("should create a new user", async () => {
        const userData = {
          name: faker.person.firstName(),
          email: faker.internet.email(),
          address: "Avenida Paulista, São Paulo",
        };
        console.log("Enviando dados para POST /users:", userData);
        const response = await supertest(server)
          .post("/api/users")
          .send(userData);
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("_id");
        expect(response.body.name).to.equal(userData.name);
        expect(response.body.email).to.equal(userData.email);
      });

      it("should return 400 if data is invalid", async () => {
        const response = await supertest(server).post("/api/users").send({});
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("message");
      });
    });

    describe("PUT /users/:id", () => {
      it("should update a user", async () => {
        const newName = faker.person.firstName();
        const response = await supertest(server)
          .put(`/api/users/${user._id}`)
          .send({ name: newName });
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("name").that.equals(newName);
      });
    });
  });
});
