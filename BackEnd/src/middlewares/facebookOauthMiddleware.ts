import { NextFunction, Request, Response } from "express";
import { AppError } from "../@shared/errors";
import axios from "axios";

class FaceBookOauthMiddleware {
  private faceBookApi = axios.create({
    baseURL: "https://graph.facebook.com/",
    timeout: 5 * 1000,
  });

  public getUserInformation = async (req: Request, res: Response, next: NextFunction) => {
    const faceBookToken = req.headers.authorization;

    if (!faceBookToken) {
      throw new AppError(401, "Token is required!");
    }

    const [_, token] = faceBookToken.split(" ");
    const userData = await this.faceBookApi.post(`me?fields=id,name,email&access_token=${token}`);

    console.log(userData);
    const user = userData.data;

    req.body = {
      name: user.name,
      email: user.email,
      password: null,
      provider: "facebook",
      providerID: user.id,
    };

    return next();
  };
}

export const faceBookOauthMiddleware = new FaceBookOauthMiddleware();
