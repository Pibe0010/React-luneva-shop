import Joi from "joi";
import { joiErrorMessages } from "./JoiErrorMessage..js";

// Esquema para inicio de sessión
export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: false })
    .required()
    .label("Email")
    .messages(joiErrorMessages),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
    .required()
    .messages(joiErrorMessages),
});

// Esquema para cambiar contraseña
export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
    .required()
    .messages(joiErrorMessages),
});

// Esquema para recuperar contraseña
export const recoveryPasswordSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: false })
    .required()
    .label("Email")
    .messages(joiErrorMessages),
});
