import express from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { ValidateMiddleware } from "../../common/middlewares/validate.middleware.js";
import { AuthSchema } from "../validators/auth.validator.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/register",ValidateMiddleware(AuthSchema), authController.Register);
authRouter.post("/login",ValidateMiddleware(AuthSchema), authController.Login);
authRouter.post("/logout", authMiddleware , authController.Logout);

export default authRouter;