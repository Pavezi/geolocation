import {
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsMongoId,
  IsObject,
} from "class-validator";
import { Type } from "class-transformer";

class PolygonDto {
  @IsString()
  @IsNotEmpty()
  type: "Polygon" = "Polygon";

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Array)
  coordinates!: number[][][];
}

export class CreateRegionDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsObject()
  @ValidateNested()
  @Type(() => PolygonDto)
  coordinates!: PolygonDto;

  @IsMongoId()
  @IsNotEmpty()
  user!: string;
}

export class RegionDTO {
  id!: string;
  name!: string;
  coordinates!: [number, number][];
  user!: string;
}
