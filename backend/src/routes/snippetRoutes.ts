import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createSnippet, updateSnippet } from "../controllers/snippetControl";

const snippetRouter = express.Router();

// userRouter.post("/register", createUser);
// userRouter.post("/login", loginUser);
// userRouter.get("/me", authMiddleware, getUser);

snippetRouter.post('/createSnippet', authMiddleware, createSnippet)
snippetRouter.put('/updateSnippet', authMiddleware, updateSnippet)


export default snippetRouter;
