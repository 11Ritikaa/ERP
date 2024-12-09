import { DataTypes } from "sequelize";
import {sequelize} from "../db/connectDB.js"; // Adjust the path to your Sequelize instance

const PurchaseOrderItem = sequelize.define(
  "PurchaseOrderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    po_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "purchase_orders", // Replace with your actual PurchaseOrders table name
        key: "id",
      },
      onDelete: "CASCADE", // Cascade delete when the PurchaseOrder is deleted
    },
    item: {
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
    tableName: "purchase_order_items",
    timestamps: false,
    underscored: true,
    indexes: [
      {
        fields: ["po_id"],
      },
    ],
  }
);

export default PurchaseOrderItem;
