import { NextFunction, Request, Response } from "express";
import UserService from "../services/users.services.ts";

export default class UsersController {
  static async getAllUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAllUsers();

      res.status(200).json(users);
    } catch (error: unknown) {
      next(error);
    }
  }

  static async getSingleUser(_req: Request, res: Response, next: NextFunction) {
    try {
      const userId: number = parseInt(_req.params.userId);
      const user = await UserService.getSingleUser(userId);

      res.status(200).json(user);
    } catch (error: unknown) {
      next(error);
    }
  }

  static async signUserUp(_req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = _req.body;
      const user = await UserService.signUserUp(username, email, password);

      res.status(200).json(user);
    } catch (error: unknown) {
      next(error);
    }
  }

  static async logUserIn(_req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = _req.body;
      const user = await UserService.logUserIn(username, email, password);

      res.status(200).json(user);
    } catch (error: unknown) {
      next(error);
    }
  }

  static async getUserPersonalInfo(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = _req.params;
      console.log("ID IN CONTROLLER:", userId);
      const userPersonalInfo = await UserService.getUserPersonalInfo(
        parseInt(userId)
      );

      res.status(200).json(userPersonalInfo);
    } catch (error: unknown) {
      next(error);
    }
  }

  static async setUserPersonalInfo(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = _req.params;
      const { firstName, lastName, image, experienceLevel, gender, age, bio } =
        _req.body;
      const updatedUser = await UserService.setUserPersonalInfo(
        userId,
        firstName,
        lastName,
        image,
        experienceLevel,
        gender,
        age,
        bio
      );

      res.status(200).json(updatedUser);
    } catch (error: unknown) {
      next(error);
    }
  }

  static async uploadImage(_req: Request, res: Response, next: NextFunction) {
    try {
      const { file } = _req;
      if (!file) throw Error("Invalid image data");

      const imageURL = await UserService.uploadImage(file);

      res.status(200).json(imageURL);
    } catch (error: unknown) {
      next(error);
    }
  }
}
