import joi from "joi";
import { joiErrorMessages } from "./JoiErrorMessage..js";

export const newUserSchema = joi.object({
  user_name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  last_name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  email: joi
    .string()
    .email({ tlds: false })
    .required()
    .messages(joiErrorMessages),
  password: joi.string().min(6).max(60).required().messages(joiErrorMessages),
});

export const newCustomerSchema = joi.object({
  user_name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  last_name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  email: joi
    .string()
    .email({ tlds: false })
    .required()
    .messages(joiErrorMessages),
  phone: joi.string().min(9).max(30).optional().messages(joiErrorMessages),
});

export const newOfferSchema = joi.object({
  ID_product: joi
    .string()
    .guid({ version: ["uuidv4", "uuidv5"] })
    .required()
    .messages(joiErrorMessages),
  discount_rate: joi.string().required().messages(joiErrorMessages),
  start_date: joi.string().required().messages(joiErrorMessages),
  ending_date: joi.string().required().messages(joiErrorMessages),
});

export const newPaymentSchema = joi.object({
  payment_method: joi
    .string()
    .valid("card", "transfer", "Paypal")
    .required()
    .messages({
      "any.only": "Introduce un estado válido (card, transfer, Paypal)",
    }),
});

export const newProductSchema = joi.object({
  name: joi.string().required().min(3).max(30).messages(joiErrorMessages),
  description: joi.string().optional().messages(joiErrorMessages),
  price: joi.string().required().messages(joiErrorMessages),
  stock: joi.number().required().min(1).max(10000).messages(joiErrorMessages),
  category: joi.string().required().min(3).max(30).messages(joiErrorMessages),
  active: joi.boolean().required().messages(joiErrorMessages),
});

export const newShippingAddressSchema = joi.object({
  address: joi.string().required().min(3).max(30).messages(joiErrorMessages),
  street_number: joi.string().required().messages(joiErrorMessages),
  floor: joi.string().optional().messages(joiErrorMessages),
  ladder_door: joi
    .string()
    .optional()
    .min(1)
    .max(10)
    .messages(joiErrorMessages),
  city: joi.string().required().min(3).max(30).messages(joiErrorMessages),
  postal_code: joi.string().required().messages(joiErrorMessages),
  country: joi.string().required().messages(joiErrorMessages),
});

export const newTrolleySchema = joi.object({
  ID_product: joi
    .string()
    .guid({ version: ["uuidv4", "uuidv5"] })
    .required()
    .messages(joiErrorMessages),
  products_amount: joi.string().required().messages(joiErrorMessages),
});

export const userSupportSchema = joi.object({
  user_name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  last_name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages(joiErrorMessages),
  message: joi.string().min(10).max(100).required().messages(joiErrorMessages),
});
