import {
  IsEmail,
  IsOptional,
  IsString,
  IsArray,
  ValidateIf,
  ArrayMinSize,
  ArrayMaxSize,
} from "class-validator";

export class CreateUserDTO {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @ValidateIf((o) => !o.coordinates)
  @IsString({
    message: "Se não fornecer coordenadas, o endereço é obrigatório",
  })
  address?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @ValidateIf((o) => !o.address)
  @IsString({
    message: "Se não fornecer o endereço, coordenadas é obrigatório",
  })
  coordinates?: [number, number];
}

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => !o.coordinates)
  address?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @ValidateIf((o) => !o.address)
  coordinates?: [number, number];
}
