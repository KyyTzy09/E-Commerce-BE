import express from "express";
import { CommentController } from "../controllers/comment.controller";
import { CommentService } from "../services/comment.service";
import { authMiddleware } from "../../common/middlewares/auth.middleware";

const commentRouter = express.Router()
const commentController = new CommentController(new CommentService)


commentRouter.get("/" ,authMiddleware, commentController.getAllComment.bind(commentController))
commentRouter.post("/" ,authMiddleware, commentController.createComment.bind(commentController))
commentRouter.get("/product" , commentController.getCommandByProductId.bind(commentController))

commentRouter.get("/user" , authMiddleware, commentController.getCommentByUserId.bind(commentController))
commentRouter.delete("/:commentId" , authMiddleware, commentController.deleteCommentById.bind(commentController))

export default commentRouter