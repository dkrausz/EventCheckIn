import { prisma } from "../database/prisma";
import { Tregister } from "../schemas/eventSchema";
import bcryptjs from "bcryptjs";

class EventService {
  public register = async (payload: Tregister) => {
    if (payload.provider == "local") {
      const hashPwd = await bcryptjs.hash(payload.password, 10);
      payload = { ...payload, password: hashPwd };
    }
    const newUser = await prisma.user.create({ data: payload });
    console.log("newUser", newUser);
    return newUser;
  };
}

export const eventService = new EventService();
