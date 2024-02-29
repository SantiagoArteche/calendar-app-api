import { Router } from "express";
import { validateFields } from "../middlewares/fieldValidators.js";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/events.controller.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { check } from "express-validator";
import { isDate } from "../helpers/isDate.js";

export const eventsRouter = Router();

eventsRouter.use(validateJWT);

eventsRouter.get("/", getEvents);

eventsRouter.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
  ],
  validateFields,
  createEvent
);

eventsRouter.put("/:id", updateEvent);

eventsRouter.delete("/:id", deleteEvent);
