import { NextFunction, Request, Response } from "express";
import { CommentService } from "../services/comment.service";

export class CommentController {
  constructor(private readonly commandService: CommentService) {}
  public async getAllComment(_req: Request, res: Response, next: NextFunction) {
    try {
      const Comments = await this.commandService.getAllComment();
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
      const Comments = await this.commandService.getAllCommentByProductId({
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
      const Comments = await this.commandService.getAllCommentByUserId({
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
      const created = await this.commandService.createComment({
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
      const deleted = await this.commandService.deleteCommentById({
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
