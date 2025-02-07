import { Router } from "express";
import { UserModel } from "./models/UserModel";

const usersRoutes = Router();

const STATUS = {
  OK: 200,
  CREATED: 201,
  UPDATED: 201,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};

usersRoutes.get("/", async (req, res) => {
  try {
    const { page, limit } = req.query;
    const [users, total] = await Promise.all([
      UserModel.find().lean(),
      UserModel.countDocuments(),
    ]);

    return res.status(STATUS.OK).json({
      rows: users,
      page,
      limit,
      total,
    });
  } catch (error) {
    return res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro ao buscar usuários", error });
  }
});

usersRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).lean();

    if (!user) {
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: "Usuário não encontrado" });
    }

    return res.status(STATUS.OK).json(user);
  } catch (error) {
    return res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro ao buscar usuário", error });
  }
});

usersRoutes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { update } = req.body;

    const user = await UserModel.findByIdAndUpdate(id, update, { new: true });

    if (!user) {
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: "Usuário não encontrado" });
    }

    return res.status(STATUS.UPDATED).json(user);
  } catch (error) {
    return res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro ao atualizar usuário", error });
  }
});

export default usersRoutes;
