import { DataTypes } from "sequelize";
import {sequelize} from "../db/connectDB.js"; // Adjust the path to your Sequelize instance

const DepartmentJobs = sequelize.define(
  "DepartmentJobs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    labourer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ack: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "department_jobs",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ["user_id"],
      },
    ],
  }
);

export default DepartmentJobs;
