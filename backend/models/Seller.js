import { DataTypes } from "sequelize";
import {sequelize} from "../db/connectDB.js"; // Adjust the path to your Sequelize instance

const Seller = sequelize.define(
  "Seller",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount_spent: {
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
    GST: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "sellers",
    timestamps: true,
    underscored: true,
  }
);

export default Seller;
