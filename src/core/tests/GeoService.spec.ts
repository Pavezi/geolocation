import { expect } from "chai";
import * as sinon from "sinon";
import axios from "axios";
import GeoLib from '../services/GeoService';

describe("GeoLib Service", function () {
  afterEach(() => {
    sinon.restore();
  });

  describe("getAddressFromCoordinates", function () {
    it("deve retornar um endereço válido", async function () {
      const mockResponse = {
        data: { display_name: "Avenida Paulista, São Paulo, Brasil" },
      };

      const axiosStub = sinon.stub(axios, "get").resolves(mockResponse);

      const result = await GeoLib.getAddressFromCoordinates({
        lat: -23.561,
        lng: -46.656,
      });

      expect(result).to.equal("Avenida Paulista, São Paulo, Brasil");
      expect(axiosStub.calledOnce).to.be.true;
    });

    it("deve lançar um erro quando o endereço não for encontrado", async function () {
      const mockResponse = { data: {} };

      sinon.stub(axios, "get").resolves(mockResponse);

      try {
        await GeoLib.getAddressFromCoordinates({ lat: -23.561, lng: -46.656 });
        throw new Error("O teste deveria ter falhado, mas não falhou");
      } catch (error: any) {
        expect(error.message).to.include("Endereço não encontrado");
      }
    });
  });

  describe("getCoordinatesFromAddress", function () {
    it("deve retornar coordenadas para um endereço válido", async function () {
      const mockResponse = {
        data: [{ lat: "-23.561", lon: "-46.656" }],
      };

      const axiosStub = sinon.stub(axios, "get").resolves(mockResponse);

      const result = await GeoLib.getCoordinatesFromAddress(
        "Avenida Paulista, São Paulo"
      );

      expect(result).to.deep.equal({ lat: -23.561, lng: -46.656 });
      expect(axiosStub.calledOnce).to.be.true;
    });

    it("deve lançar um erro quando as coordenadas não forem encontradas", async function () {
      const mockResponse = { data: [] };

      sinon.stub(axios, "get").resolves(mockResponse);

      try {
        await GeoLib.getCoordinatesFromAddress("Endereço Inexistente");
        throw new Error("O teste deveria ter falhado, mas não falhou");
      } catch (error: any) {
        expect(error.message).to.include("Coordenadas não encontradas");
      }
    });
  });
});
