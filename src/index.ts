import express, { Request, Response } from "express";
const app = express();

import { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routes/auth.route";
import { error } from "./middlewares/error";

// middlewares
app.use(json()); // parses data coming from body
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // no trailing / as cors matches exact same string
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  })
);

// routes
app.use("/auth", authRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express!");
});

// error
app.use(error);
export default app;
