import Joi from 'joi';

const updateProductSchema = Joi.object({
  productName: Joi.string()
    .trim()
    .min(10)
    .max(120)
    .required(),
  
  description: Joi.string()
    .trim()
    .min(10)
    .required(),
  
  material: Joi.string()
    .trim()
    .valid('metal', 'wood', "brass", "copper")
    .required(),
  
    category: Joi.number()
                .not().empty()
              .required()
              .greater(0),
  
  subCategory: Joi.number()
    .integer()
    .greater(0)
    .required(),
  
  cost: Joi.number()
    .greater(0)
    .required(),
  
  price: Joi.number()
    .greater(0)
    .required(),
  
  stock: Joi.number()
    .integer()
    .greater(0)
    .required(),
  
  status: Joi.string()
    .trim()
    .valid('ACTIVE',"DRAFT",'PROTOTYPE', 'DEACTIVE')
    .required(),
  
  length: Joi.number()
    .greater(0)
    .required(),
  
  width: Joi.number()
    .greater(0)
    .required(),
  
  height: Joi.number()
    .greater(0)
    .required(),
  
  dimensionUnit: Joi.string()
    .trim()
    .valid('cm', 'in')
    .required(),
  
  weight: Joi.number()
    .greater(0)
    .required(),
  
  weightUnit: Joi.string()
    .trim()
    .valid('kg', 'gram', 'lbs')
    .required(),
  
  tags: Joi.array()
    .items(Joi.string().trim().required())
    .min(1)
    .required(),
  
  hsn: Joi.number()
    .integer()
    .greater(0)
    .required(),
  
  paleteApplicable: Joi.boolean()
    .default(false)
    .required(),
  
  hasfinish: Joi.boolean()
    .default(false)
    .optional(),
  
  variantionName: Joi.string()
    .trim()
    .required(),
  
  type: Joi.string()
    .trim().lowercase()
    .required().valid("normal","antique"),
  
  materialType: Joi.string()
    .trim()
    .required(),
  
  setOf: Joi.number()
    .integer()
    .min(0)
    .required(),
    gstSlab: Joi.number().min(5).required()
});

export default updateProductSchema;
