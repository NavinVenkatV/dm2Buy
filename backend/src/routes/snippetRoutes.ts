import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createSnippet, deleteSnippet, getSnippet, getUniqueSnippet, updateSnippet } from "../controllers/snippetControl";

const snippetRouter = express.Router();

// userRouter.post("/register", createUser);
// userRouter.post("/login", loginUser);
// userRouter.get("/me", authMiddleware, getUser);

snippetRouter.post('/createSnippet', authMiddleware, createSnippet)
snippetRouter.put('/updateSnippet/:id', authMiddleware, updateSnippet)
snippetRouter.get('/getSnippet', authMiddleware, getSnippet)
snippetRouter.get('/getUniqueSnippet', getUniqueSnippet)
snippetRouter.delete('/deleteSnippet/:id', authMiddleware, deleteSnippet)


export default snippetRouter;
