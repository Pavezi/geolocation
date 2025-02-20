import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const { page, limit } = req.query;
      const users = await UserService.getAllUsers();
      return res
        .status(200)
        .json({ rows: users, page, limit, total: users.length });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar usuários", error });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar usuário", error });
    }
  }
}
