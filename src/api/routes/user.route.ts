import express from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { upload } from "../../common/middlewares/multer.middleware";
import { userSChema } from "../validators/user.validator";
import { ValidateMiddleware } from "../../common/middlewares/validate.middleware";
import { UserService } from "../services/user.service";


const userRouter = express.Router();
const userController = new UserController(new UserService);

userRouter.get("/" , authMiddleware , userController.getUserProfile.bind(userController));
userRouter.post("/update" , authMiddleware, upload.single("image"), ValidateMiddleware(userSChema), userController.updateUserProfile.bind(userController));

export default userRouter;