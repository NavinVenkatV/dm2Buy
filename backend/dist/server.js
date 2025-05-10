"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const snippetRoutes_1 = __importDefault(require("./routes/snippetRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/user", userRoutes_1.default);
app.use('/api/snippet', snippetRoutes_1.default);
app.listen(3000, () => console.log("Server running on port 3000"));
