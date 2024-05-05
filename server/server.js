import express from "express";
import cors from "cors";
import eventRouter from "./routes/events.js";
import authRouter from "./routes/auth.js"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(cors({
    credentials: false,
    origin: 'http://localhost:5173',
}));
app.use(express.json());

app.use("/events", eventRouter);
app.use("/auth", authRouter)

// start the Express server
app.listen(PORT, () => {
    console.log(`[SERVER] ONLINE @ PORT ${PORT}`);
});