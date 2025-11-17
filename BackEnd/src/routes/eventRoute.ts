import { Router } from "express";
import { googleOauthMiddleware } from "../middlewares/googleOauthMiddleware";
import { bodyValidator } from "../middlewares/bodyValidationMiddleware";
import { registerSchema } from "../schemas/eventSchema";
import { eventController } from "../controller/eventController";

export const eventRouter = Router();

eventRouter.post("/google", googleOauthMiddleware.getUserInformation, bodyValidator.bodtIsValid(registerSchema), eventController.RegisterGoogleOauth);
