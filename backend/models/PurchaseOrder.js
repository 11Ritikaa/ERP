import { DataTypes } from "sequelize";
import {sequelize} from "../db/connectDB.js"; // Adjust the path to your Sequelize instance

const PurchaseOrder = sequelize.define(
  "PurchaseOrder",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "sellers", // Replace with your actual Sellers table name
        key: "id",
      },
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "orders", // Replace with your actual Orders table name
        key: "id",
      },
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    document: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    invoice: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    eway: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    gatepass: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
  },
  {
    tableName: "purchase_orders",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ["order_id"],
      },
      {
        fields: ["seller_id"],
      },
    ],
  }
);

export default PurchaseOrder;
