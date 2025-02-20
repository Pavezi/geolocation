import mongoose from "mongoose";
import config from "../../config";

export const connectDB = async () => {
  if (process.env.NODE_ENV === "test") {
    console.log(
      "📦 Ambiente de teste detectado. Ignorando conexão com o MongoDB real."
    );
    return;
  }

  try {
    await mongoose.connect(config.mongoUri);
    console.log("📦 MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
};
