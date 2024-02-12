import express from "express";
import { getAllUsers } from "../dal/users";

const router = express.Router();

router.get("/users", (req, res) => {
  const users = getAllUsers();
  res.send(users);
});

export default router;
