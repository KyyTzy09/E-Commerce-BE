import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { HttpException } from "../error/exception.js";

export function ValidateMiddleware(schema : Joi.ObjectSchema) {
    return async (req : Request, _res : Response, next : NextFunction) => {
        const {error} = await schema.validateAsync(req.body , {abortEarly : false});
        if (error) {
            throw new HttpException(400 , error.details.map( (err : Error) => err.message).join(', '));
        }
        
        next();
    }
}