import { Request, Response } from "express";
import { eventService } from "../services/eventService";

class EventController {
  public RegisterGoogleOauth = async (req: Request, res: Response) => {
    const response = await eventService.register(req.body);
    return res.status(201).json({ response });
  };
}

export const eventController = new EventController();
