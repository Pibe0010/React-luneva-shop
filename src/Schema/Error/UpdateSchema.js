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
