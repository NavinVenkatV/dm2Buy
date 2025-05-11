import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createSnippet, getSnippet, getUniqueSnippet, updateSnippet } from "../controllers/snippetControl";

const snippetRouter = express.Router();

// userRouter.post("/register", createUser);
// userRouter.post("/login", loginUser);
// userRouter.get("/me", authMiddleware, getUser);

snippetRouter.post('/createSnippet', createSnippet)
snippetRouter.put('/updateSnippet', authMiddleware, updateSnippet)
snippetRouter.get('/getSnippet', getSnippet)
snippetRouter.get('/getUniqueSnippet', getUniqueSnippet)


export default snippetRouter;
