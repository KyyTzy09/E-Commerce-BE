import Joi from "joi";

export const storeSchema = Joi.object({
    name : Joi.string().min(3).required().optional().allow(""),
    info : Joi.string().min(3).required().optional().allow(""),
})
