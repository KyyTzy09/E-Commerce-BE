import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service.js";


const userService = new UserService()
export class UserController {
  public async getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const profile = await userService.getProfileById({ id: user?.id });
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
      const image = req.file ? req.file.path :users.profile.image;

      const updateProfile = await userService.updateUser({
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
