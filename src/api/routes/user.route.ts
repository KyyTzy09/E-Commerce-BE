import express from "express";
import { UserController } from "../controllers/user.controller.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { upload } from "../../common/middlewares/multer.middleware.js";
import { userSChema } from "../validators/user.validator.js";
import { ValidateMiddleware } from "@/common/middlewares/validate.middleware.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.get("/" , authMiddleware , userController.getUserProfile);
userRouter.post("/update" , authMiddleware, upload.single("image"), ValidateMiddleware(userSChema), userController.updateUserProfile);

export default userRouter;