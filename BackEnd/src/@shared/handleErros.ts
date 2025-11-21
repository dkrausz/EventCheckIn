import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";
import { AppError } from "./errors";

export class HandleErrors {
  static execute(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
      console.log(err.message);
      return res.status(err.errorCode).json({ message: err.message });
    }

    if (err instanceof ZodError) {
      console.log(err.message);
      return res.status(400).json({ message: err.message });
    }

    if (err instanceof JsonWebTokenError) {
      return res.status(401).json({ message: err.message });
    }

    console.log(err.message);
    return res.status(500).json({ message: "internal server error" });
  }
}
