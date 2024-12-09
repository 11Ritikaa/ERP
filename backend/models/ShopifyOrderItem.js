import { DataTypes } from "sequelize";
import {sequelize} from "../db/connectDB.js"; // Adjust the path to your Sequelize instance

const ShopifyOrderItem = sequelize.define(
  "ShopifyOrderItem",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
      indexing: true,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1, // Quantity must be at least 1
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "shopify_order_items", // Custom table name
    timestamps: false, // Assuming you don't need timestamps for order items
    underscored: true, // Converts column names to snake_case
    indexes: [
      {
        fields: ["order_id"], // Indexing order_id for faster queries on orders
      },
    ],
  }
);

export default ShopifyOrderItem;
