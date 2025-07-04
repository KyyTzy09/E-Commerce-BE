import { NextFunction, Request, Response } from "express";
import { CommentService } from "../services/comment.service.js";

const commentService = new CommentService()
export class CommentController {
  public async getAllComment(_req: Request, res: Response, next: NextFunction) {
    try {
      const Comments = await commentService.getAllComment();
      res.status(200).json({
        status_code: 200,
        message: `Berhasil mendapatkan semua data komentar`,
        data: Comments,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getCommandByProductId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { productId } = req.query;
      const Comments = await commentService.getAllCommentByProductId({
        productId: String(productId),
      });

      res.status(200).json({
        status_code: 200,
        message: `Berhasil mendapatkan semua data Komentar dengan Id ${productId}`,
        data: Comments,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getCommentByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await (req as any).user;
      const Comments = await commentService.getAllCommentByUserId({
        userId: user?.id,
      });
      res.status(200).json({
        status_code: 200,
        message: `Berhasil mendapatkan semua data Komentar dengan id ${user?.id}`,
        data: Comments,
      });
    } catch (error) {
      next(error);
    }
  }
  public async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, komentar } = req.body;
      const user = (req as any).user;
      const created = await commentService.createComment({
        userId: user?.id,
        productId,
        komentar,
      });

      res.status(201).json({
        status_code: 201,
        message: `Berhasil menambahkan komentar`,
        data: created,
      });
    } catch (error) {
      next(error);
    }
  }
  public async deleteCommentById(req: Request, res: Response, next: NextFunction) {
    try {
      const { commentId } = req.params;
      const deleted = await commentService.deleteCommentById({
        id: commentId,
      });

      res.status(201).json({
        status_code: 200,
        message: `Berhasil menghapus komentar dengan id ${commentId}`,
        data: deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}
