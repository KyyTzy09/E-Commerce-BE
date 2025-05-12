import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";


export class UserController {
  constructor (private readonly userService : UserService){}
  
  public async getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const profile = await this.userService.getProfileById({ id: user?.id });
      res
        .status(200)
        .json({ status_code: 200, message: "Berhasil mendapatkan data profile", data: profile});
    } catch (error) {
      next(error);
    }
  }

  public async updateUserProfile( req: Request, res: Response, next: NextFunction ) {
    try {
      const { name, bio } = req.body;
      const users = (req as any).user;
      const image = req.file ? req.file.path : users.profile.image;

      const updateProfile = await this.userService.updateUser({
        id: users.id,
        name: name ? name : users.profile.name,
        bio: bio ? bio : users.profile.bio,
        image,
      });

      res.json({
        status_code: 200,
        message: "Update User Success",
        data: updateProfile,
      });
    } catch (error) {
      next(error);
    }
  }
}
