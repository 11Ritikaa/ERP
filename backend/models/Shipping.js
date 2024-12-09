import { DataTypes } from "sequelize";
import {sequelize} from "../db/connectDB.js"; // Adjust the path to your Sequelize instance

const Shipping = sequelize.define(
  "Shipping",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
    },
    tracking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    label: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(
        "Pending",
        "Shipped",
        "Delivered",
        "Returned",
        "Cancelled"
      ),
      allowNull: false,
      defaultValue: "Pending",
    },
    dimension: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    volumetric_weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0,
      },
    },
    duties: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0,
      },
    },
    taxes: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0,
      },
    },
    exp: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0,
      },
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    shipping_address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "addresses",
        key: "id",
      },
    },
  },
  {
    tableName: "shippings",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ["order_id"],
      },
      {
        fields: ["shipping_address_id"],
      },
    ],
  }
);

export default Shipping;
