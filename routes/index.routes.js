import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { eventsRouter } from "./events.routes.js";


export const indexRouter = Router();

indexRouter.use("/api/auth", authRouter);
indexRouter.use("/api/events", eventsRouter);
