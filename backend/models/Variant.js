import { DataTypes } from "sequelize";
import {sequelize} from "../db/connectDB.js"; // Adjust the path to your Sequelize instance
import Product from "./Product.js"
const Variant = sequelize.define(
  "Variant",
  {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
    p_id: {
      type: DataTypes.STRING,
      references: {
        model: Product, // Replace 'Product' with your related table name
        key: "id",
      },
      allowNull: false,
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
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    weight_unit: {
      type: DataTypes.ENUM("kg", "gram", "lbs"),
      allowNull: false,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    base_price: {
      type: DataTypes.FLOAT,
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
    status: {
      type: DataTypes.ENUM("Active", "Draft", "Prototype", "Deactive"),
      allowNull: false,
      defaultValue: "Draft",
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
    },
    shopify_id_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    etsy_id_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    etsy_id_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    set_of: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    variant_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Enable automatic createdAt and updatedAt fields
    tableName: "variants", // Custom table name, adjusted to plural form
    underscored: true, // Ensures snake_case for column names
    indexes: [
      {
        fields: ["id"],
      },
      {
        fields: ["shopify_id_1"],
      },
      {
        fields: ["shopify_id_2"],
      },
      {
        fields: ["etsy_id_1"],
      },
      {
        fields: ["etsy_id_2"],
      },
    ],
  }
);

export default Variant;
