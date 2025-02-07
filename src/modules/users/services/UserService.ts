import { UserModel } from "../models/UserModel";

export class UserService {
  static async getAllUsers() {
    return await UserModel.find().lean();
  }

  static async getUserById(id: string) {
    return await UserModel.findById(id).lean();
  }
}
