import { NextFunction, Request, Response } from "express";
import { HttpException } from "../error/exception";

export async function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof HttpException) {
    res
      .status(err.status)
      .json({ status_code: err.status, message: err.message });
  } else {
    res.status(500).json({ sattus_code : 500, message: err.message });
  }
}
