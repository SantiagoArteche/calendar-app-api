import { Router } from "express";
import {
  createUser,
  getUsers,
  loginUser,
  revalidateToken,
  getUserById,
} from "../controllers/auth.controller.js";
import { check } from "express-validator";
import { validateFields } from "../middlewares/fieldValidators.js";
import { validateJWT } from "../middlewares/validateJWT.js";

export const authRouter = Router();

authRouter.get("/", getUsers);

authRouter.get("/renew", validateJWT, revalidateToken);

authRouter.get("/:id", getUserById);

authRouter.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  loginUser
);

authRouter.post(
  "/new",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password should have at least 6 characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  createUser
);
