import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";


export class AuthController {
  constructor( private readonly authService : AuthService ){}
  public async Register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const created = await this.authService.signUp({ email, password });

      res.status(201).json({ message: "Register Success", data: created });
    } catch (error) {
      next(error);
    }
  }
  public async Login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body

      const login = await this.authService.signIn({ email, password })

      res.cookie("token", login, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

      console.log(req.cookies["token"])
      res.status(200).json({status_code : 200, message: "Login Success"});
    } catch (error) {
      next(error);
    }
  }
  public async Logout(_req : Request , res : Response , next : NextFunction) {
    try {
      res.clearCookie("token");
      res.status(200).json({status_code : 200, message: "Logout Success"});
    } catch (error) {
      next(error);
    }
  }
}
