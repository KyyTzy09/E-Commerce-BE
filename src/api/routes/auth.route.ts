import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { ValidateMiddleware } from "../../common/middlewares/validate.middleware";
import { AuthSchema } from "../validators/auth.validator";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { AuthService } from "../services/auth.service";

const authRouter = express.Router();
const authController = new AuthController(new AuthService);

authRouter.post("/register",ValidateMiddleware(AuthSchema), authController.Register.bind(authController));
authRouter.post("/login",ValidateMiddleware(AuthSchema), authController.Login.bind(authController));
authRouter.post("/logout", authMiddleware , authController.Logout.bind(authController));

export default authRouter;