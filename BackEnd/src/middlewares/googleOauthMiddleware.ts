import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../@shared/errors";

class GoogleOauthMiddleware {
  private googleAPI = axios.create({
    baseURL: "https://www.googleapis.com/oauth2/v3",
    timeout: 5 * 1000,
  });

  public getUserInformation = async (req: Request, res: Response, next: NextFunction) => {
    const googleToken = req.headers.authorization;

    if (!googleToken) {
      throw new AppError(401, "Token is required!");
    }

    const userDate = await this.googleAPI.get("/userinfo", {
      headers: {
        Authorization: googleToken,
      },
    });

    const user = userDate.data;
    req.body = {
      name: user.name,
      email: user.email,
      password: null,
      provider: "google",
      providerID: user.sub,
    };

    return next();
  };
}

export const googleOauthMiddleware = new GoogleOauthMiddleware();
