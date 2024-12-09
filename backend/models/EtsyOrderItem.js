import { DataTypes } from "sequelize";
import {sequelize} from "../db/connectDB.js"; // Adjust the path to your Sequelize instance

const EtsyOrderItem = sequelize.define(
  "EtsyOrderItem",
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
        min: 1, 
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "etsy_order_items",
    timestamps: true, 
    underscored: true, 
    indexes: [
      {
        fields: ["order_id"], 
      },
    ],
  }
);

export default EtsyOrderItem;
