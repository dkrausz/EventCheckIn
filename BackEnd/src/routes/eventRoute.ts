import { Router } from "express";
import { googleOauthMiddleware } from "../middlewares/googleOauthMiddleware";
import { bodyValidator } from "../middlewares/bodyValidationMiddleware";
import { registerSchema } from "../schemas/eventSchema";
import { eventController } from "../controller/eventController";
import { faceBookOauthMiddleware } from "../middlewares/facebookOauthMiddleware";

export const userRouter = Router();

userRouter.post("/register/google", googleOauthMiddleware.getUserInformation, bodyValidator.bodtIsValid(registerSchema), eventController.RegisterUser);
userRouter.post("/register/facebook", faceBookOauthMiddleware.getUserInformation, bodyValidator.bodtIsValid(registerSchema), eventController.RegisterUser);
userRouter.post("/register/local", bodyValidator.bodtIsValid(registerSchema), eventController.RegisterUser);
