import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;
let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    console.log("📦 MongoDB já está conectado.");
    return;
  }

  try {
    console.log("📦 Tentando conectar ao MongoDB...");
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    isConnected = true;
    console.log("📦 MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("📦 Erro ao conectar ao MongoDB:", error);
    throw error;
  }
}

export async function disconnectFromDatabase() {
  if (!isConnected) {
    console.log("📦 MongoDB já está desconectado.");
    return;
  }

  try {
    console.log("📦 Tentando desconectar do MongoDB...");
    await mongoose.disconnect();
    await mongoServer.stop();
    isConnected = false;
    console.log("📦 MongoDB desconectado.");
  } catch (error) {
    console.error("📦 Erro ao desconectar do MongoDB:", error);
    throw error;
  }
}
