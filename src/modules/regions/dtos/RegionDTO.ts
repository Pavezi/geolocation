import {
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateIf,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
  IsMongoId,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateRegionDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  @ValidateNested({ each: true })
  @Type(() => Array)
  coordinates!: [number, number][];

  @IsMongoId()
  ownerId!: string;
}

export class RegionDTO {
  id!: string;
  name!: string;
  coordinates!: [number, number][];
  ownerId!: string;
}
