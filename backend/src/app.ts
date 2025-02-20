import * as express from "express";
import router from "./routes";
import { connectDB } from "./core/database/connection";
import "reflect-metadata";

const app = express();

app.use(express.json());

connectDB();

app.use("/api", router);

export default app;
