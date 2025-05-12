import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().min(3).required().optional(),
    description: Joi.string().min(3).required().optional().allow(""),
    image: Joi.string().uri().required().optional().allow(""),
    price: Joi.number().required().optional(),
    stok: Joi.number().required().optional(),
    storeId : Joi.string().required().optional()
})
