import StatusCode from "http-status-codes";
import { standardResponseTemplate as successResponse } from "../utils/response.js";
import {
  BadRequestError,
  NotFoundError,
  ConflictError,
} from "../errors/index.js";
import { generateOrderedId } from "../utils/generate_id.js";
import db from "../models/index.js";

async function listAllProducts(req, res, next) {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;

    if (page <= 0) page = 1;
    if (limit <= 0) limit = 10;

    const offset = (page - 1) * limit;

    const data = await db.ProductModel.findAndCountAll({
      attributes: [
        "id",
        "title",
        "description",
        "stock",
        "base_price",
        "sku",
        [db.sequelize.col("category.name"), "category_name"],
        [
          db.sequelize.literal(
            `(SELECT COUNT(*) FROM "variants" WHERE "variants"."p_id" = "product"."id")`
          ),
          "variantCount",
        ],
        // Include category name from the categories table
      ],
      limit,
      offset,
      // Join with categories table to fetch the category name
      include: [
        {
          model: db.CategoryModel, // Assuming CategoryModel is the Sequelize model for the categories table
          as: "category", // Define the alias for the relationship (you need to define this relationship in your Sequelize models)
          attributes: [], // Only join for the category, we will fetch the category name using `db.sequelize.col`
        },
      ],
    });

    if (Array.isArray(data.rows) && data.rows.length === 0) {
      throw new NotFoundError("No Products Available !!");
    }

    const totalPages = Math.ceil(data.count / limit);

    return res.status(StatusCode.OK).json(
      successResponse("success", {
        result: data.rows,
        count: data.rows.length,
        currentPage: page,
        totalPages: totalPages,
      })
    );
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const productController = {
  listAllProducts,
  createProduct: async (req, res, next) => {
    try {
      let result = null;
      const {
        productName,
        description,
        material,
        category,
        subCategory,
        sku,
        cost,
        price,
        etsystore1price,
        etsystore2price,
        shopifystore1price,
        shopifystore1cprice,
        shopifystore2price,
        shopifystore2cprice,
        stock,
        status,
        length,
        width,
        height,
        dimensionUnit,
        weight,
        weightUnit,
        tags,
        hsn,
        paletteApplication,
        hasfinish,
        variantionName,
        type,
        materialType,
        setOf,
        gstSlab,
      } = req.body;
      const productObject = {
        id: generateOrderedId(),
        title: productName,
        description,
        category_id: category,
        sub_category_id: subCategory,
        sku,
        cost,
        base_price: price,
        etsy_1_price: etsystore1price ? etsystore1price : null,
        etsy_2_price: etsystore2price ? etsystore2price : null,
        shopify_1_price: shopifystore1price ? shopifystore1price : null,
        shopify_1_cprice: shopifystore1cprice ? shopifystore1cprice : null,
        shopify_2_price: shopifystore2price ? shopifystore2price : null,
        shopify_2_cprice: shopifystore2cprice ? shopifystore2cprice : null,
        stock,
        totalstock: stock,
        status:status.toUpperCase(),
        l: length,
        b: width,
        h: height,
        dimension_unit: dimensionUnit,
        weight,
        weight_unit: weightUnit,
        tags: tags ? tags : null,
        hsn,
        pallete_applicable: paletteApplication ? paletteApplication : false,
        has_finish: hasfinish,
        variant_name: variantionName,
        set_of: setOf,
        material_type: materialType,
        material,
        type:type.toLowerCase(),
        gst_percentage: gstSlab,
      };

      result = await db.ProductModel.create(productObject);
      return res
        .status(StatusCode.CREATED)
        .json(successResponse("succes", result));
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      let result = null;
      const {
        productName,
        description,
        material,
        category,
        subCategory,
        sku,
        cost,
        price,
        etsystore1price,
        etsystore2price,
        shopifystore1price,
        shopifystore1cprice,
        shopifystore2price,
        shopifystore2cprice,
        stock,
        status,
        length,
        width,
        height,
        dimensionUnit,
        weight,
        weightUnit,
        tags,
        hsn,
        paletteApplication,
        hasfinish,
        variantionName,
        type,
        materialType,
        setOf,
        gstSlab,
      } = req.body;
      const productObject = {
        id: generateOrderedId(),
        title: productName,
        description,
        category_id: category,
        sub_category_id: subCategory,
        sku,
        cost,
        base_price: price,
        etsy_1_price: etsystore1price ? etsystore1price : null,
        etsy_2_price: etsystore2price ? etsystore2price : null,
        shopify_1_price: shopifystore1price ? shopifystore1price : null,
        shopify_1_cprice: shopifystore1cprice ? shopifystore1cprice : null,
        shopify_2_price: shopifystore2price ? shopifystore2price : null,
        shopify_2_cprice: shopifystore2cprice ? shopifystore2cprice : null,
        stock,
        totalstock: stock,
        status :status.toUpperCase(),
        l: length,
        b: width,
        h: height,
        dimension_unit: dimensionUnit,
        weight,
        weight_unit: weightUnit,
        tags: tags ? tags : null,
        hsn,
        pallete_applicable: paletteApplication ? paletteApplication : false,
        has_finish: hasfinish,
        variant_name: variantionName,
        set_of: setOf || 1,
        material_type: materialType,
        material,
        type,
        gst_percentage: gstSlab,
      };
      result = await db.ProductModel.create(productObject);
      const response = successResponse("success", {
        result,
        message: `product  ${result.title} added successfully`,
      });
      return res.status(StatusCode.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(typeof id, id);
      const product = await db.ProductModel.findByPk(id);
      if (!product) {
        throw new NotFoundError("Product not found!");
      }
      await db.ProductModel.destroy({
        where: { id },
      });
      return res
        .status(StatusCode.OK)
        .json(
          successResponse(
            "success",
            [],
            undefined,
            undefined,
            undefined,
            "Product deleted successfully!"
          )
        );
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getProductById: async (req, res, next) => {
    try {
      const { id } = req.params;
      // const product = await db.ProductModel.findOne({
      //   where: { id },
      //   include: [
      //     {
      //       model: db.VariantModel,
      //       as: "variants",
      //       attributes: {
      //         exclude: [
      //           "etsy_id_1",
      //           "etsy_id_2",
      //           "shopify_id_1",
      //           "shopify_id_2",
      //         ],
      //       },
      //     },{
      //       model: db.CategoryModel,
      //       as: "category",
      //       attributes: ['id',"name"],
      //       where:{id: 'category_id'}
      //     },
      //     {
      //       model: db.CategoryModel,
      //       as: "subCategory",
      //       attributes:['name'],
      //       where:{id: 'sub_category_id'}
      //     }
      //   ],
      // });

      const product = await db.ProductModel.findOne({
        where: { id },
        include: [
          {
            model: db.VariantModel,
            as: "variants", // Variants remain as an array
            attributes: {
              exclude: [
                "etsy_id_1",
                "etsy_id_2",
                "shopify_id_1",
                "shopify_id_2",
              ],
            },
          },
        ],
        attributes: [
          "id",
          "title",
          "description",
          "material",
          "cost",
          "stock",
          "base_price",
          "sku",
          "images",
          "l","b", "h",
          "dimension_unit",
          "weight", 
          "weight_unit",
          "tags",
          "hsn",
          "gst_percentage",
          "set_of",
          "material_type",
          "variant_name",
          "type",
          "status",
          "has_finish",
          "pallete_applicable",
          [
            db.sequelize.literal(`(
                SELECT name FROM categories
                WHERE id = product.category_id
              )`),
            "category_name",
          ],
          [
            db.sequelize.literal(`(
                SELECT name FROM categories
                WHERE id = product.sub_category_id
              )`),
            "sub_category",
          ],
        ],
      });

      if (!product) {
        throw new NotFoundError("Product not found. Please check the ID.");
      }

      if (!product) {
        throw new NotFoundError("Product Not Found please check the id");
      }

      //   console.log(variations);
      res.status(StatusCode.OK).json(
        successResponse("success", {
          result: product,
        })
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  checkSKUUnique: async (req, res, next) => {
    try {
      let { sku } = req.body;
      sku = sku?.trim();
      // Validate SKU
      const isValid = sku && /^[A-Z0-9_-]+$/.test(sku);
      if (!isValid) {
        throw new BadRequestError("Invalid SKU format");
      }
      const data = await db.ProductModel.findOne({ where: { sku } });
      if (!data) {
        return res
          .status(StatusCode.OK)
          .json(successResponse("success", { message: "SKU availble" }));
      }
      throw new ConflictError("SKU already Exists");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

export default productController;
