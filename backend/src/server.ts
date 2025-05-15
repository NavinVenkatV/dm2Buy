import express from "express";
import userRouter from "./routes/userRoutes";
import snippetRouter from "./routes/snippetRoutes";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv"
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://dm2-buy.vercel.app/",
        methods: ["GET", "POST", "PUT"]
    }
});

app.use(express.json());
app.use(cors());

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

app.use("/api/user", userRouter);
app.use("/api/snippet", snippetRouter);

server.listen(process.env.PORT || 3000, () => console.log("Server running on port 3000"));
