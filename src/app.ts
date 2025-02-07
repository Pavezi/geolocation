import * as express from "express";
import usersRoutes from "./modules/users/routes";
import regionsRoutes from "./modules/regions/routes";
import { connectDB } from "./core/database/connection";

const app = express();

app.use(express.json());

connectDB();

app.use("/users", usersRoutes);
app.use("/regions", regionsRoutes);

export default app;
