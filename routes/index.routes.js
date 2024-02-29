import { Router } from "express";
import { authRouter } from "./auth.routes.js";

export const indexRouter = Router();

indexRouter.use("/api/auth", authRouter);
