/**
 *  This file centralizes the Express Controller for endpoints
 */
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
      const { email, password } = _req.body;
      const user = await UserService.signUserUp(email, password);

      res.status(200).json(user);
    } catch (error: unknown) {
      next(error);
    }
  }

  static async logUserIn(_req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = _req.body;
      const user = await UserService.logUserIn(email, password);

      res.status(200).json(user);
    } catch (error: unknown) {
      next(error);
    }
  }

  static async logGoogleUserIn(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, firstName, lastName, image } = _req.body;
      console.log(email, firstName, lastName, image);
      const user = await UserService.logGoogleUserIn(
        email,
        firstName,
        lastName,
        image
      );

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
      const {
        displayName,
        firstName,
        lastName,
        image,
        experienceLevel,
        gender,
        dateOfBirth,
        bio,
      } = _req.body;
      console.log("DISPLAY NAME:", displayName);
      const updatedUser = await UserService.setUserPersonalInfo(
        userId,
        displayName,
        firstName,
        lastName,
        image,
        experienceLevel,
        gender,
        JSON.parse(dateOfBirth),
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
