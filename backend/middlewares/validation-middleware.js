import schemas from "../validations-schemas/index.js";

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    console.log({ message: error.details[0].message})
    return res.status(400).json({ message: error.details[0].message });
    
  }
  next();
};

export const validationSchemas = {
  validateProduct: validate(schemas.productSchema),
  validateUpdateProduct: validate(schemas.updateProductSchema),
  validateVariant: validate(schemas.variantSchema),
}