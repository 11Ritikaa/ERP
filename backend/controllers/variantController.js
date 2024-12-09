import StatusCode from "http-status-codes";
import { standardResponseTemplate as successResponse } from "../utils/response.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import db from "../models/index.js";
import { generateVariantId } from "../utils/generate_id.js";

const variantController = {
  listVariantsByProductId: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new BadRequestError("Product ID is required.");
      }

      const variants = await db.VariantModel.findAll({ where: { p_id: id } });

      if (!variants.length) {
        throw new NotFoundError(`No variants found for product ID: ${id}`);
      }

      res.status(StatusCode.OK).json(
        successResponse("success",{
          message: "Variants retrieved successfully.",
          data: variants,
        })
      );
    } catch (error) {
      console.error("Error fetching variants by product ID:", error.message);
      next(error);
    }
  },

  listVariantByVariantId: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestError("Provide a variant ID.");
      }

      const variant = await db.VariantModel.findOne({ where: { id } });

      if (!variant) {
        throw new NotFoundError(`Variant not found with ID: ${id}`);
      }

      res.status(StatusCode.OK).json(
        successResponse("success",{
          message: "Variant retrieved successfully.",
          result:variant,
        })
      );
    } catch (error) {
      console.error("Error fetching variant by ID:", error.message);
      next(error);
    }
  },

  deleteVariantById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const variant = await db.VariantModel.findByPk(id);

      if (!variant) {
        throw new NotFoundError("Variant not found!");
      }

      await db.VariantModel.destroy({ where: { id } });

      res.status(StatusCode.OK).json(
        successResponse("success",{
          message: "Variant deleted successfully!",
        })
      );
    } catch (error) {
      console.error("Error deleting variant:", error.message);
      next(error);
    }
  },

  createVariant: async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        variationnName,
        variantStock,
        variantWeight,
        variantWeightUnit,
        variantLength,
        variantBreadth,
        varaiantHeight,
        variantDimensionUnit,
        variantPrice,
        variantCost,
        variantStatus,
        setOf,
      } = req.body;

      const newVariant = {
        id: generateVariantId(),
        p_id: id,
        variant_name: variationnName || null,
        l: variantLength,
        b: variantBreadth,
        h: varaiantHeight,
        dimension_unit: variantDimensionUnit,
        weight: variantWeight,
        weight_unit: variantWeightUnit,
        cost: variantCost,
        base_price: variantPrice,
        stock: variantStock,
        status: variantStatus,
        sku: await generateSku(id), // Await the SKU generation
        set_of: setOf || 1,
      };

      const variant = await db.VariantModel.create(newVariant);

      res.status(StatusCode.OK).json(
        successResponse("success",{
          message: "Variant added successfully.",
          data: variant,
        })
      );
    } catch (error) {
      console.error("Error creating variant:", error);
      next(error);
    }
  },

  updateVariant: async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        variationnName,
        variantStock,
        variantWeight,
        variantWeightUnit,
        variantLength,
        variantBreadth,
        varaiantHeight,
        variantDimensionUnit,
        variantPrice,
        variantCost,
        variantStatus,
        setOf,
      } = req.body;

      if (!id) throw new BadRequestError("Please provide a variant ID.");

      const [updated] = await db.VariantModel.update(
        {
          variant_name: variationnName || null,
          l: variantLength,
          b: variantBreadth,
          h: varaiantHeight,
          dimension_unit: variantDimensionUnit,
          weight: variantWeight,
          weight_unit: variantWeightUnit,
          cost: variantCost,
          base_price: variantPrice,
          stock: variantStock,
          status: variantStatus,
          set_of: setOf,
        },
        {
          where: { id },
        }
      );

      if (!updated) throw new NotFoundError("Variant not found.");
      const response = successResponse("success",{
        message: "variant updated successfully"
      })
      res
        .status(StatusCode.OK)
        .json();
    } catch (error) {
      console.error("Error updating variant:", error.message);
      next(error);
    }
  },
};

const generateSku = async (p_id) => {
  try {
    const variants = await db.VariantModel.findAll({
      where: { p_id },
      attributes: ["sku"],
    });

    const existingSkus = variants.map((variant) => {
      if (variant.sku) {
        const sequence = parseInt(variant.sku.split("-")[2], 10);
        return sequence || 0;
      }
      return 0;
    });

    const nextSequenceNumber =
      existingSkus.length === 0 ? 1 : Math.max(...existingSkus) + 1;

    return `${p_id}-${nextSequenceNumber.toString().padStart(3, "0")}`;
  } catch (error) {
    console.error("Error generating SKU:", error.message);
    throw new Error("Error generating SKU.");
  }
};

export default variantController;
