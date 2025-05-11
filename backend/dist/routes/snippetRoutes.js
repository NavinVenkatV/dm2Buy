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
snippetRouter.post('/createSnippet', snippetControl_1.createSnippet);
snippetRouter.put('/updateSnippet', authMiddleware_1.authMiddleware, snippetControl_1.updateSnippet);
exports.default = snippetRouter;
