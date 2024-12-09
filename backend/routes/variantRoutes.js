import express from "express";
import { validationSchemas } from "../middlewares/validation-middleware.js";
import variantController from "../controllers/variantController.js";

const variantRoutes = express.Router();

variantRoutes
  .route("/:id")
  .get(variantController.listVariantByVariantId)
  .put(variantController.updateVariant)
  .delete(variantController.deleteVariantById);

  // variantRoutes.get("/:id?", variantController.listVariantByVariantId)
  variantRoutes.route("/add/:id").post(variantController.createVariant);
  variantRoutes.route("/list/:id").get(variantController.listVariantsByProductId);

export default variantRoutes;
