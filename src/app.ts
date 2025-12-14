import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routes/auth.route";
import { error } from "./middlewares/error";

const app = express();

// middlewares
app.use(express.json()); // parses data coming from body
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // no trailing / as cors matches exact same string
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  })
);

// routes
app.use("/auth", authRouter);

// error
app.use(error);

export default app;
