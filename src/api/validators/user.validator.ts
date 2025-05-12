import Joi from "joi";

export const userSChema = Joi.object({
    name : Joi.string().min(3).optional().allow(""),
    bio : Joi.string().min(3).optional().allow(""),
})