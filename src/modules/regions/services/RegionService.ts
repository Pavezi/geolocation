import { RegionModel } from "../models/RegionModel";
import { CreateRegionDTO, RegionDTO } from "../dtos/RegionDTO";

export class RegionService {
  static async createRegion(data: CreateRegionDTO): Promise<RegionDTO> {
    const region = await RegionModel.create(data);
    return region.toObject();
  }

  static async getAllRegions(): Promise<RegionDTO[]> {
    return await RegionModel.find().lean();
  }

  static async getRegionsContainingPoint(
    point: [number, number]
  ): Promise<RegionDTO[]> {
    return await RegionModel.find({
      coordinates: {
        $geoIntersects: { $geometry: { type: "Point", coordinates: point } },
      },
    }).lean();
  }

  static async getRegionsNearPoint(
    point: [number, number],
    maxDistance: number
  ): Promise<RegionDTO[]> {
    return await RegionModel.find({
      coordinates: {
        $near: {
          $geometry: { type: "Point", coordinates: point },
          $maxDistance: maxDistance,
        },
      },
    }).lean();
  }

  static async deleteRegion(regionId: string): Promise<void> {
    await RegionModel.deleteOne({ _id: regionId });
  }
}
