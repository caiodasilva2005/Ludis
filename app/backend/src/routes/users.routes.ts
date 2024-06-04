/**
 * This file centralizes the express endpoints
 */
import express from "express";
import UsersController from "../controllers/users.controllers.ts";
import { intMinZero, nonEmptyString } from "../utils/validation.utils.ts";
import { body } from "express-validator";
import multer, { memoryStorage } from "multer";

const userRouter = express.Router();
const upload = multer({
  limits: { fileSize: 30000000 },
  storage: memoryStorage(),
});

userRouter.get("/", UsersController.getAllUsers);
userRouter.get("/:userId", UsersController.getSingleUser);
userRouter.post(
  "/signup",
  nonEmptyString(body("username")),
  nonEmptyString(body("email")).isEmail(),
  nonEmptyString(body("password")),
  UsersController.signUserUp
);
userRouter.post(
  "/login",
  nonEmptyString(body("username")),
  nonEmptyString(body("email")).isEmail(),
  nonEmptyString(body("password")),
  UsersController.logUserIn
);
userRouter.get("/:userId/personal-info", UsersController.getUserPersonalInfo);
userRouter.post(
  "/:userId/personal-info",
  nonEmptyString(body("firstName")),
  nonEmptyString(body("lastName")),
  nonEmptyString(body("image")),
  nonEmptyString(body("experienceLevel")),
  nonEmptyString(body("gender")),
  body("dateOfBirth"),
  body("bio"),
  UsersController.setUserPersonalInfo
);
userRouter.get("/:userId/friends", UsersController.getAllFriends);
userRouter.post(
  "/:userId/friends/add",
  intMinZero(body("friendUserId")),
  UsersController.addFriend
);
userRouter.post(
  "/:userId/friends/remove",
  intMinZero(body("friendUserId")),
  UsersController.removeFriend
);
userRouter.post(
  "/upload-image",
  upload.single("image"),
  UsersController.uploadImage
);

export default userRouter;
