import express from "express";
import UsersController from "../controllers/users.controllers.ts";
import { nonEmptyString } from "../utils/validation.utils.ts";
import { body } from "express-validator";

const userRouter = express.Router();

userRouter.get("/", UsersController.getAllUsers);
userRouter.get("/:userId", UsersController.getSingleUser);
userRouter.post(
  "/signup",
  nonEmptyString(body("username")),
  nonEmptyString(body("email")).isEmail(),
  nonEmptyString(body("password")),
  UsersController.signUserUp
);

export default userRouter;
