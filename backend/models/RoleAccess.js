import { DataTypes } from "sequelize";
import {sequelize} from "../db/connectDB.js"; // Adjust the path to your Sequelize instance

const RoleAccess = sequelize.define(
  "RoleAccess",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles", // Replace with your Role table name
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Replace with your User table name
        key: "id",
      },
    },
    per_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "permissions", // Replace with your Permissions table name
        key: "id",
      },
    },
  },
  {
    tableName: "role_access",
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ["role_id"] },
      { fields: ["user_id"] },
      { fields: ["per_id"] },
    ],
  }
);

export default RoleAccess;
