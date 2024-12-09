import Joi from "joi";

const productSchema = Joi.object({
    productName: Joi.string()
        .trim()
        .lowercase()
        .required()
        .min(10)
        .max(120)
        .not().empty(),

    description: Joi.string()
        .trim()
        .lowercase()
        .required()
        .min(10)
        .not().empty(),

    material: Joi.string()
        .valid('metal', 'wood','brass','copper')
        .required(),
    category: Joi.number()
                .not().empty()
              .required()
              .greater(0),
            
    subCategory: Joi.number()
        .required()
        .not().empty()
        .greater(0),

    sku: Joi.string()
        .trim()
        .lowercase()
        .required()
        .not().empty(),

    cost: Joi.number()
        .required()
        .not().empty()
        .greater(0),

    price: Joi.number()
        .required()
        .not().empty()
        .greater(0),

    etsystore1price: Joi.number().greater(0).optional(),
    etsystore2price: Joi.number().greater(0).optional(),
    shopifystore1price: Joi.number().greater(0).optional(),
    shopifystore2cprice: Joi.number().greater(0).optional(),

    stock: Joi.number()
        .required()
        .not().empty()
        .greater(0),

    status: Joi.string()
        .trim()
        .uppercase()
        .required()
        .not().empty().valid('ACTIVE', 'PROTOTYPE', 'DRAFT', "DEACTIVE"),

    length: Joi.number()
        .required()
        .not().empty()
        .greater(0),
        
    width: Joi.number()
        .required()
        .not().empty()
        .greater(0),

    height: Joi.number()
        .required()
        .not().empty()
        .greater(0),

    dimensionUnit: Joi.string()
        .valid('cm', 'inch')
        .required(),

    weight: Joi.number()
        .required()
        .not().empty()
        .greater(0),

    weightUnit: Joi.string()
        .valid('kg', 'gram', 'lbs')
        .required(),

    tags: Joi.array().items(Joi.string().trim().lowercase()).min(1).required(),

    hsn: Joi.number()
        .required()
        .not().empty()
        .greater(0),

    paletteApplication: Joi.boolean().default(false).optional(),
    
    hasfinish: Joi.boolean().default(false).optional(),

    variationName: Joi.string()
        .trim()
        .lowercase()
        .required(),

    type: Joi.string()
      	.trim() 
      	.lowercase() 
      	.required().valid('normal', 'antique'),

    materialType: Joi.string() 
      	.trim() 
      	.lowercase() 
      	.required(),
    
    setOf: Joi.number().min(0).required(),
}).unknown(true);

export default productSchema;