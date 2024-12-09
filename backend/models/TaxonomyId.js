import { DataTypes } from "sequelize";
import {sequelize} from "../db/connectDB.js"; // Adjust the path to your Sequelize instance

const TaxonomyId = sequelize.define(
  "TaxonomyId",
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
    tableName: "taxonomy_ids", // Explicit table name (optional)
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    underscored: true,
  }
);

export default TaxonomyId;
