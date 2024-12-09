import { DataTypes } from "sequelize";
import {sequelize} from "../db/connectDB.js"; // Adjust the path to your Sequelize instance

const Finishes = sequelize.define(
  "Finishes",
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
  },
  {
    timestamps: true, 
    tableName: "finishes", 
    underscored: true,
  }
);

export default  Finishes;
