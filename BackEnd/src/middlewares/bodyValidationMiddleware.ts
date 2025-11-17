import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

class BodyValidator {
  public bodtIsValid = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    console.log("valdiador de body");
    req.body = schema.parse(req.body);
    return next();
  };
}

export const bodyValidator = new BodyValidator();
