import { RegionModel } from "../models/RegionModel";
import { CreateRegionDTO, RegionDTO } from "../dtos/RegionDTO";

export class RegionService {
  static async createRegion(data: CreateRegionDTO): Promise<RegionDTO> {
    const region = await RegionModel.create(data);
    return {
      id: region._id.toString(),
      name: region.name,
      coordinates: region.coordinates.coordinates[0].map(
        (coord: number[]): [number, number] => [coord[0], coord[1]]
      ),
      user: region.user.toString(),
    };
  }

  static async getAllRegions(): Promise<RegionDTO[]> {
    const regions = await RegionModel.find().lean();
    return regions.map((region) => ({
      id: region._id.toString(),
      name: region.name,
      coordinates: region.coordinates.coordinates[0].map(
        (coord: number[]): [number, number] => [coord[0], coord[1]]
      ),
      user: region.user.toString(),
    }));
  }

  static async getRegionsContainingPoint(
    point: [number, number]
  ): Promise<RegionDTO[]> {
    const regions = await RegionModel.find({
      "coordinates.coordinates": {
        $geoIntersects: { $geometry: { type: "Point", coordinates: point } },
      },
    })
      .populate("user", "name email")
      .lean();

    return regions.map((region) => ({
      id: region._id.toString(),
      name: region.name,
      coordinates: region.coordinates.coordinates[0].map(
        (coord: number[]): [number, number] => [coord[0], coord[1]]
      ),
      user: region.user.toString(),
    }));
  }

  static async getRegionsNearPoint(
    point: [number, number],
    maxDistance: number
  ): Promise<RegionDTO[]> {
    const regions = await RegionModel.find({
      coordinates: {
        $near: {
          $geometry: { type: "Point", coordinates: point },
          $maxDistance: maxDistance,
        },
      },
    }).lean();

    return regions.map((region) => ({
      id: region._id.toString(),
      name: region.name,
      coordinates: region.coordinates.coordinates[0].map(
        (coord: number[]): [number, number] => [coord[0], coord[1]]
      ),
      user: region.user.toString(),
    }));
  }

  static async deleteRegion(regionId: string): Promise<boolean> {
    const result = await RegionModel.deleteOne({ _id: regionId });
    return result.deletedCount > 0;
  }
}
