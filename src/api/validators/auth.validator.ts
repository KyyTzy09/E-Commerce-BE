import Joi from "joi";

export const AuthSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(3)
    .required(),
  password: Joi.string().min(8).required(),
});
