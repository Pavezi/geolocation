import { Router } from "express";
import userRoutes from "./modules/users/routes";
import regionRoutes from "./modules/regions/routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/regions", regionRoutes);

export default router;
