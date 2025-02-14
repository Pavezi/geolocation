import { Request, Response } from "express";
import { RegionService } from "../services/RegionService";
import { CreateRegionDTO } from "../dtos/RegionDTO";
import { validate } from "class-validator";

export class RegionController {
  static async createRegion(req: Request, res: Response) {
    try {
      const data = Object.assign(new CreateRegionDTO(), req.body);
      const errors = await validate(data);
      if (errors.length > 0) return res.status(400).json({ errors });

      const region = await RegionService.createRegion(data);
      return res.status(201).json(region);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar região", error });
    }
  }

  static async getAllRegions(req: Request, res: Response) {
    try {
      const regions = await RegionService.getAllRegions();
      return res.json(regions);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar regiões", error });
    }
  }

  static async getRegionsContainingPoint(req: Request, res: Response) {
    try {
      const { longitude, latitude } = req.query;
      if (!longitude || !latitude)
        return res.status(400).json({ message: "Parâmetros inválidos" });

      const point: [number, number] = [
        parseFloat(longitude as string),
        parseFloat(latitude as string),
      ];
      const regions = await RegionService.getRegionsContainingPoint(point);

      return res.json(regions);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar regiões", error });
    }
  }

  static async getRegionsNearPoint(req: Request, res: Response) {
    try {
      const { longitude, latitude, maxDistance } = req.query;
      if (!longitude || !latitude || !maxDistance)
        return res.status(400).json({ message: "Parâmetros inválidos" });

      const point: [number, number] = [
        parseFloat(longitude as string),
        parseFloat(latitude as string),
      ];
      const distance = parseFloat(maxDistance as string);

      const regions = await RegionService.getRegionsNearPoint(point, distance);
      return res.json(regions);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar regiões próximas", error });
    }
  }

  static async deleteRegion(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await RegionService.deleteRegion(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar região", error });
    }
  }
}
