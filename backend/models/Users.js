import { DataTypes } from "sequelize";
import {sequelize} from "../db/connectDB.js"; // Adjust the path to your Sequelize instance

const Users = sequelize.define(
  "Users",
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
    uname: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aadhar_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "users", // Explicit table name (optional)
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    underscored: true,
  }
);

export default Users;
