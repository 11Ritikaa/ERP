import { DataTypes } from "sequelize";
import {sequelize} from "../db/connectDB.js"; // Adjust the path to your Sequelize instance

const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    material: {
      type: DataTypes.ENUM("wood", "metal", "brass", "copper"),
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories", // Replace with your category table name
        key: "id",
      },
    },
    sub_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories", // Replace with your subcategory table name
        key: "id",
      },
    },
    sku: {
      type: DataTypes.STRING, // Fixed: Should be a string
      unique: true,
    },
    cost: {
      type: DataTypes.FLOAT, // Fixed: Should use FLOAT/DECIMAL
      allowNull: false,
    },
    base_price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    etsy_1_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    etsy_2_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    shopify_1_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    shopify_1_cprice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    shopify_2_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    shopify_2_cprice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalstock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Active", "Draft", "Prototype", "Deactive"),
      allowNull: false,
    },
    status_e1: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status_e2: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status_s1: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status_s2: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    shopify_id_1: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    shopify_id_2: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    etsy_id_1: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    etsy_id_2: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    images: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    l: {
      type: DataTypes.FLOAT,
    },
    b: {
      type: DataTypes.FLOAT,
    },
    h: {
      type: DataTypes.FLOAT,
    },
    dimension_unit: {
      type: DataTypes.ENUM("in", "cm"),
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    weight_unit: {
      type: DataTypes.ENUM("kg", "gram", "lbs"),
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    hsn: {
      type: DataTypes.STRING, // Fixed: Should be a string
    },
    gst_percentage: {
      type: DataTypes.ENUM("5", "12", "18"), // Fixed: Values as strings
    },
    has_finish: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    type: {
      type: DataTypes.ENUM("normal", "antique"),
    },
    set_of: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    variant_name: {
      type: DataTypes.STRING,
    },
    taxonomy_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    material_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pallete_applicable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    tableName: "products",
    underscored: true,
    indexes: [
      { fields: ["shopify_id_1", "shopify_id_2", "etsy_id_1", "etsy_id_2"] },
    ],
  }
);

export default Product;
