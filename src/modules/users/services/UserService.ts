import UserModel from "../models/UserModel";
import GeoService from "../../../core/services/GeoService";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/UserDTO";
import { validate } from "class-validator";

export class UserService {
  static async getAllUsers() {
    return await UserModel.find().lean();
  }

  static async getUserById(id: string) {
    return await UserModel.findById(id).lean();
  }

  static async createUser(data: CreateUserDTO) {
    const dto = Object.assign(new CreateUserDTO(), data);
    const errors = await validate(dto);

    if (errors.length > 0) {
      throw new Error("Dados inválidos: " + JSON.stringify(errors));
    }

    if (
      (data.address && data.coordinates) ||
      (!data.address && !data.coordinates)
    ) {
      throw new Error("Informe o endereço ou as coordenadas.");
    }

    if (data.address) {
      const { lat, lng } = await GeoService.getCoordinatesFromAddress(
        data.address
      );
      data.coordinates = [lng, lat];
    } else if (data.coordinates) {
      data.address = await GeoService.getAddressFromCoordinates(
        data.coordinates
      );
    }

    return await UserModel.create(data);
  }

  static async updateUser(id: string, data: UpdateUserDTO) {
    const dto = Object.assign(new UpdateUserDTO(), data);
    const errors = await validate(dto);

    if (errors.length > 0) {
      throw new Error("Dados inválidos: " + JSON.stringify(errors));
    }

    if (data.address && data.coordinates) {
      throw new Error("Informe apenas o endereço ou as coordenadas.");
    }

    if (data.address) {
      const { lat, lng } = await GeoService.getCoordinatesFromAddress(
        data.address
      );
      data.coordinates = [lng, lat];
    } else if (data.coordinates) {
      data.address = await GeoService.getAddressFromCoordinates(
        data.coordinates
      );
    }

    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteUser(id: string) {
    return await UserModel.findByIdAndDelete(id);
  }
}