"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const snippetRoutes_1 = __importDefault(require("./routes/snippetRoutes"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const allowedUrls = ['https://dm2-buy.vercel.app', 'http://localhost:3000'];
const io = new socket_io_1.Server(server, {
    cors: {
        origin: allowedUrls,
        methods: ["GET", "POST", "PUT", "OPTIONS"]
    }
});
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: allowedUrls,
    credentials: true
}));
io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);
    socket.on("join-room", (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
    });
    socket.on("code-change", ({ roomId, code }) => {
        socket.to(roomId).emit("receive-code", code);
    });
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});
app.use("/api/user", userRoutes_1.default);
app.use("/api/snippet", snippetRoutes_1.default);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
