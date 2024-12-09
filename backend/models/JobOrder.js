import { DataTypes } from "sequelize";
import {sequelize} from "../db/connectDB.js"; 

const JobOrder = sequelize.define(
  "JobOrder",
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
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "orders", 
        key: "id",
      },
      onDelete: "CASCADE",
    },
    transfer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
    },
    job_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", 
        key: "id",
      },
    },
    documents: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    is_done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "job_orders",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ["order_id"],
      },
      {
        fields: ["user_id"],
      },
    ],
  }
);

export default  JobOrder;
