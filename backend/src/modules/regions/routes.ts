import { Router } from "express";
import { RegionController } from "./controllers/RegionController";

const router = Router();

router.post("/", RegionController.createRegion);
router.get("/", RegionController.getAllRegions);
router.get("/contains", RegionController.getRegionsContainingPoint);
router.get("/near", RegionController.getRegionsNearPoint);
router.delete("/:id", RegionController.deleteRegion);

export default router;
