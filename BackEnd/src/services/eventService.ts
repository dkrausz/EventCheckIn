import { Tregister } from "../schemas/eventSchema";

class EventService {
  public register = async (payload: Tregister) => {
    console.log(payload);

    return payload;
  };
}

export const eventService = new EventService();
