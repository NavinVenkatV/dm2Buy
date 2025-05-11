import express from "express";
import userRouter from "./routes/userRoutes";
import snippetRouter from "./routes/snippetRoutes";
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors())

app.use("/api/user", userRouter);
app.use('/api/snippet', snippetRouter)

app.listen(3000, () => console.log("Server running on port 3000"));
