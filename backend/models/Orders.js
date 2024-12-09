import { DataTypes } from "sequelize";
import {sequelize} from "../db/connectDB.js"; // Adjust the path to your Sequelize instance

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    provider: {
      type: DataTypes.ENUM("shopify", "custom", "offline", "etsy"),
      allowNull: false,
      validate: {
        isIn: [["shopify", "custom", "offline", "etsy"]],
      },
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    gross_amt: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "customers",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
      validate: {
        min: 0,
      },
    },
    status: {
      type: DataTypes.ENUM("approved", "processing"),
      allowNull: false,
      defaultValue: "processing",
    },
    internal_status: {
      type: DataTypes.ENUM(
        "production",
        "packaging",
        "qc",
        "polishing",
        "shipping",
        "shipped"
      ),
      allowNull: true,
    },
    ship_charges: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
      validate: {
        min: 0,
      },
    },
    ship_address_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "addresses",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    net_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    bill_address_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "addresses",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    purchase_order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "purchase_orders",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    job_order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "job_orders",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    etsy_created: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    etsy_updated: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    shopify_created: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    shopify_updated: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    pdf_documents: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    invoice: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    shipping_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "shippings",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    print_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ["customer_id"] },
      { fields: ["ship_address_id"] },
      { fields: ["bill_address_id"] },
      { fields: ["purchase_order_id"] },
      { fields: ["job_order_id"] },
      { fields: ["shipping_id"] },
    ],
  }
);
export default  Order;
