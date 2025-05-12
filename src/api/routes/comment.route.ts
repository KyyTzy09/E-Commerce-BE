import express from "express";
import { CommentController } from "../controllers/command.controller";
import { CommentService } from "../services/comment.service";
import { authMiddleware } from "../../common/middlewares/auth.middleware";

const commentRouter = express.Router()
const commentController = new CommentController(new CommentService)


commentRouter.get("/" , commentController.getCommentByUserId)
commentRouter.post("/" ,authMiddleware, commentController.createComment.bind(commentController))

commentRouter.get("/user" , authMiddleware, commentController.getCommentByUserId.bind(commentController))
commentRouter.delete("/:commentId" , authMiddleware, commentController.deleteComment.bind(commentController))

export default commentRouter