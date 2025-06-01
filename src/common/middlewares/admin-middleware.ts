import { NextFunction, Request, Response } from "express";
import { HttpException } from "../error/exception";

export const adminMiddleware = async (req : Request , res : Response , next : NextFunction) => {
    try {
        const user = (req as any).user;
        if (user.role !== "ADMIN") {
            throw new HttpException(403, "Lu bukan Admin Boss, ga bisa akses");
        }
        next();
    } catch (error) {
        next(error);
    }
}