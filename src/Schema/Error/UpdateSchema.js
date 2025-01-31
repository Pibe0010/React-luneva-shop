import joi from "joi";
import { joiErrorMessages } from "./JoiErrorMessage..js";
import { imgSchema } from "./ImgSchema.js";

export const updateProductSchema = joi.object({
  name: joi.string().optional().min(3).max(30).messages(joiErrorMessages),
  description: joi.string().optional().messages(joiErrorMessages),
  price: joi.string().optional().messages(joiErrorMessages),
  stock: joi.number().optional().min(1).max(10000).messages(joiErrorMessages),
  category: joi.string().optional().min(3).max(30).messages(joiErrorMessages),
  active: joi.boolean().optional().messages(joiErrorMessages),
  image_one: imgSchema.optional(),
  image_two: imgSchema.optional(),
  image_three: imgSchema.optional(),
});

export const updateOfferSchema = joi.object({
  discount_rate: joi.string().optional().messages(joiErrorMessages),
  start_date: joi.string().optional().messages(joiErrorMessages),
  ending_date: joi.string().optional().messages(joiErrorMessages),
});

export const updateShipmentSchema = joi.object({
  status: joi
    .string()
    .valid("pending", "sent", "delivered", "cancelled")
    .required()
    .messages(joiErrorMessages),
});

export const updatePaymentSchema = joi.object({
  payment_method: joi
    .string()
    .valid("card", "transfer", "Paypal")
    .required()
    .messages({
      "any.only": "Introduce un estado válido (card, transfer, Paypal)",
    }),
});

export const updatePaymentStatusSchema = joi.object({
  status: joi
    .string()
    .valid("pending", "paid", "cancelled")
    .required()
    .messages({
      "any.only": "Introduce un estado válido (pending, paid, cancelled)",
    }),
});

export const updateUserSchema = joi.object({
  user_name: joi
    .string()
    .min(3)
    .max(30)
    .optional()
    .strip()
    .messages(joiErrorMessages),
  last_name: joi
    .string()
    .min(3)
    .max(30)
    .optional()
    .strip()
    .messages(joiErrorMessages),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .optional()
    .strip()
    .messages(joiErrorMessages),
  phone: joi
    .string()
    .min(9)
    .max(30)
    .optional()
    .strip()
    .messages(joiErrorMessages),
  avatar: imgSchema.optional().allow("").strip(),
});
