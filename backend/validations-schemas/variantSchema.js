import Joi from "joi"

const variantSchema = Joi.object({
  variantLength: Joi.number()
    .greater(0)
    .required(),
  
  variantBreadth: Joi.number()
    .greater(0)
    .required(),
  
  variantHeight: Joi.number()
    .greater(0)
    .required(),
  
  variantionnName: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z ]+$/) // Allows only lowercase letters and spaces
    .required(),
  
  variantPrice: Joi.number()
    .greater(0)
    .required(),
  
  variantStock: Joi.number()
    .greater(0)
    .required(),
  
  variantWeight: Joi.number()
    .greater(0)
    .required(),
  
  variantWeightUnit: Joi.string()
    .trim()
    .lowercase()
    .valid('kg', 'gram', 'lbs')
    .required(),
  
  variantDimensionUnit: Joi.string()
    .trim()
    .lowercase()
    .valid('cm', 'in')
    .required(),
  
  variantCost: Joi.number()
    .greater(0)
    .required(),
  variantStatus: Joi.string()
    .trim()
    .uppercase()
    .valid('ACTIVE','DRAFT','PROTOTYPE', 'DEACTIVE')
    .required(),
  variantSetOf: Joi.number().min(1).required(),
});

export default variantSchema;
