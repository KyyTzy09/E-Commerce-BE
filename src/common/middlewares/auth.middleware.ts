import { NextFunction, Request, Response } from "express";
import { HttpException } from "../error/exception";
import Jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UserService } from "../../api/services/user.service";

export async function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const token = await req.cookies["token"];
    const service = new UserService();
    // Jika token tidak ada
    if (!token) {
      throw new HttpException(401, "Token tidak ada");
    }
    // Decode token
    const decoded = await Jwt.decode(token) as { id: string };

    // Get user by id
    const user = await service.getProfileById({ id: decoded.id });

    if (!user) {
      throw new HttpException(401, "Unauthorized");
    }

    // Set user ke request
    (req as any).user = user;

    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new HttpException(401, "Unauthorized");
    }
    next(error)
  }
}