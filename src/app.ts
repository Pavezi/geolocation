import * as express from "express";
import router from "./routes";
import { connectDB } from "./core/database/connection";
import { setupSwagger } from "./config/swagger";

const app = express();

setupSwagger(app);

app.use(express.json());

connectDB();

app.use("/api", router);

export default app;
