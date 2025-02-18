
import * as dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["MONGO_URI", "PORT", "NOMINATIM_URL"];

for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    throw new Error(
      `❌ A variável de ambiente ${varName} não foi definida no .env!`
    );
  }
}

const config = {
  mongoUri: process.env.MONGO_URI as string,
  port: Number(process.env.PORT) || 3003,
  nominatimUrl: process.env.NOMINATIM_URL as string,
};

export default config;
