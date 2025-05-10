import express from "express";
import { createUser, getUser, loginUser } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", authMiddleware, getUser);

export default userRouter;
