"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const snippetControl_1 = require("../controllers/snippetControl");
const snippetRouter = express_1.default.Router();
// userRouter.post("/register", createUser);
// userRouter.post("/login", loginUser);
// userRouter.get("/me", authMiddleware, getUser);
snippetRouter.post('/createSnippet', authMiddleware_1.authMiddleware, snippetControl_1.createSnippet);
snippetRouter.put('/updateSnippet/:id', authMiddleware_1.authMiddleware, snippetControl_1.updateSnippet);
snippetRouter.get('/getSnippet', authMiddleware_1.authMiddleware, snippetControl_1.getSnippet);
snippetRouter.get('/getUniqueSnippet', snippetControl_1.getUniqueSnippet);
snippetRouter.delete('/deleteSnippet/:id', authMiddleware_1.authMiddleware, snippetControl_1.deleteSnippet);
exports.default = snippetRouter;
