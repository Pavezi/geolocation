import { Router } from "express";
import { UserService } from "./services/UserService";
import { HttpStatus } from "../../enums/status";

const router = Router();

router.get("/", async (req, res) => {
  const users = await UserService.getAllUsers();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await UserService.getUserById(req.params.id);
  if (!user) return res
    .status(HttpStatus.NOT_FOUND)
    .json({ message: "Usuário não encontrado" });
  res.json(user);
});

router.post("/", async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(HttpStatus.CREATED).json(user);
  } catch (error: any) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    if (!user)
      return res.status(HttpStatus.NOT_FOUND).json({ message: "Usuário não encontrado" });
    res.json(user);
  } catch (error: any) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  await UserService.deleteUser(req.params.id);
  res.status(HttpStatus.OK).send();
});

export default router;
