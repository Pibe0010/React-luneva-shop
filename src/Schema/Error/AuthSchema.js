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
export const forgotPasswordUserSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: false })
    .required()
    .label("Email")
    .messages(joiErrorMessages),
});

// Esquema para el restablecimiento de contraseña
export const resetPasswordUserSchema = Joi.object({
  newPassword: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
    .required()
    .label("Nueva contraseña")
    .messages({
      ...joiErrorMessages,
      "string.pattern.base":
        "La contraseña debe contener al menos una mayúscula, una minúscula y un número",
    }),
  repeatPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .label("Repetir nueva contraseña")
    .messages({
      ...joiErrorMessages,
      "any.only": "Las contraseñas no coinciden",
    }),
});
