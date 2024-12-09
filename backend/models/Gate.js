import { DataTypes } from "sequelize";
import {sequelize} from "../db/connectDB.js"; // Adjust the path to your Sequelize instance

const Gate = sequelize.define(
  "Gate",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("in", "out"),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "orders",
        key: "id",
      },
    },
    purchase_order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "purchase_orders",
        key: "id",
      },
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "gates",
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ["user_id"] },
      { fields: ["order_id"] },
      { fields: ["purchase_order_id"] },
    ]
    
  }
);

export default  Gate;
