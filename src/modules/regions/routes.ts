import { Router } from "express";
import { RegionModel } from "./models/RegionModel";

const regionsRoutes = Router();

const STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};

regionsRoutes.get("/", async (req, res) => {
  try {
    const regions = await RegionModel.find().lean();
    return res.status(STATUS.OK).json(regions);
  } catch (error) {
    return res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro ao buscar regiões", error });
  }
});

export default regionsRoutes;
