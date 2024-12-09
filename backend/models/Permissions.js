import { DataTypes } from "sequelize";
import {sequelize} from "../db/connectDB.js"; // Adjust the path to your Sequelize instance

const Permissions = sequelize.define(
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
    timestamps: true, // Disable automatic timestamps as we are defining created_at and updated_at explicitly
    tableName: "permissions", // Custom table name, adjust as needed
    underscored: true,
  }
);

export default Permissions;
