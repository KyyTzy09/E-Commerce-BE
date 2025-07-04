import express from "express";
import { CommentController } from "../controllers/comment.controller.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";

const commentRouter = express.Router()
const commentController = new CommentController()


commentRouter.get("/" ,authMiddleware, commentController.getAllComment)
commentRouter.post("/" ,authMiddleware, commentController.createComment)
commentRouter.get("/product" , commentController.getCommandByProductId)

commentRouter.get("/user" , authMiddleware, commentController.getCommentByUserId)
commentRouter.delete("/:commentId" , authMiddleware, commentController.deleteCommentById)

export default commentRouter