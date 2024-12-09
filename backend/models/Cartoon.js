import { DataTypes } from "sequelize";
import {sequelize} from "../db/connectDB.js"; // Adjust the path to your Sequelize instance

const Cartoon = sequelize.define(
  "Cartoon",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    dimension_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    volumetric_weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    l: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    b: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    h: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    avg_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  },
  {
    tableName: "cartoons",
    timestamps: true,
    underscored: true,
  }
);

export default Cartoon;
