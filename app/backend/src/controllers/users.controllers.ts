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
}
