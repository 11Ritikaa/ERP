import {sequelize} from "../db/connectDB.js"; 

// Import Models
import AddressModel from "./Addresses.js";
import CartoonModel from "./Cartoon.js";
import CategoryModel from "./Category.js";
import CustomersModel from "./Customers.js";
import CustomOrderItemModel from "./CustomOrderItem.js";
import DepartmentModel from "./Department.js";
import DepartmentJobsModel from "./DepartmentJobs.js";
import EtsyOrderItemModel from "./EtsyOrderItem.js";
import ExpensesModel from "./Expenses.js";
import FinishesModel from "./Finishes.js";
import GateModel from "./Gate.js";
import JobOrderModel from "./JobOrder.js";
import OrdersModel from "./Orders.js";
import PermissionsModel from "./Permissions.js";
import ProductModel from "./Product.js";
import PurchaseOrderModel from "./PurchaseOrder.js";
import PurchaseOrderItemModel from "./PurchaseOrderItem.js";
import RawMaterialModel from "./RawMaterial.js";
import RoleAccessModel from "./RoleAccess.js";
import RolesModel from "./Roles.js";
import SellerModel from "./Seller.js";
import ShippingModel from "./Shipping.js";
import ShopifyOrderItemModel from "./ShopifyOrderItem.js";
import TaxonomyIdModel from "./TaxonomyId.js"; // Corrected typo in filename
import UsersModel from "./Users.js";
import VariantModel from "./Variant.js";

// Product and Category
ProductModel.belongsTo(CategoryModel, { foreignKey: "category_id", as: "category" });
ProductModel.belongsTo(CategoryModel, { foreignKey: "sub_category_id", as: "subCategory" });
VariantModel.belongsTo(ProductModel, { foreignKey: "p_id", as: "product" });

CategoryModel.hasMany(ProductModel, { foreignKey: "category_id", as: "products" });
CategoryModel.hasMany(ProductModel, { foreignKey: "sub_category_id", as: "subProducts" });
ProductModel.hasMany(VariantModel, { foreignKey: "p_id", as: "variants" });

// User Roles and Permission
RolesModel.hasMany(RoleAccessModel, { foreignKey: "role_id", as: "roleAccesses" });
RoleAccessModel.belongsTo(RolesModel, { foreignKey: "role_id", as: "role" });

UsersModel.hasMany(RoleAccessModel, { foreignKey: "user_id", as: "roleAccesses" });
RoleAccessModel.belongsTo(UsersModel, { foreignKey: "user_id", as: "user" });

PermissionsModel.hasMany(RoleAccessModel, { foreignKey: "per_id", as: "roleAccesses" });
RoleAccessModel.belongsTo(PermissionsModel, { foreignKey: "per_id", as: "permission" });

// Orders and related Models
OrdersModel.belongsTo(CustomersModel, { foreignKey: "customer_id", as: "customer" });
OrdersModel.belongsTo(AddressModel, { foreignKey: "ship_address_id", as: "shippingAddress" });
OrdersModel.belongsTo(AddressModel, { foreignKey: "bill_address_id", as: "billingAddress" });
OrdersModel.belongsTo(PurchaseOrderModel, { foreignKey: "purchase_order_id", as: "purchaseOrder" });
OrdersModel.belongsTo(JobOrderModel, { foreignKey: "job_order_id", as: "jobOrder" });
OrdersModel.belongsTo(ShippingModel, { foreignKey: "shipping_id", as: "shippingDetails" });

CustomersModel.hasMany(OrdersModel, { foreignKey: "customer_id", as: "orders" });

// Addresses
AddressModel.hasMany(OrdersModel, { foreignKey: "ship_address_id", as: "shippingOrders" });
AddressModel.hasMany(OrdersModel, { foreignKey: "bill_address_id", as: "billingOrders" });

PurchaseOrderModel.hasMany(OrdersModel, { foreignKey: "purchase_order_id", as: "purchaseOrders" });
JobOrderModel.hasMany(OrdersModel, { foreignKey: "job_order_id", as: "jobOrders" });
ShippingModel.hasMany(OrdersModel, { foreignKey: "shipping_id", as: "orders" });

// Address and Customer Relations
AddressModel.belongsTo(CustomersModel, { foreignKey: "customer_id", as: "customer" });
CustomersModel.hasMany(AddressModel, { foreignKey: "customer_id", as: "addresses" });

// Category model for hierarchical structure
CategoryModel.hasMany(CategoryModel, { foreignKey: "parent_category_id", as: "subCategories" });
CategoryModel.belongsTo(CategoryModel, { foreignKey: "parent_category_id", as: "parentCategory" });

// Gate model 
GateModel.belongsTo(UsersModel, { foreignKey: "user_id", as: "user" });
UsersModel.hasMany(GateModel, { foreignKey: "user_id", as: "gates" });
GateModel.belongsTo(OrdersModel, { foreignKey: "order_id", as: "order" });
OrdersModel.hasMany(GateModel, { foreignKey: "order_id", as: "gates" });
GateModel.belongsTo(PurchaseOrderModel, { foreignKey: "purchase_order_id", as: "purchaseOrder" });
PurchaseOrderModel.hasMany(GateModel, { foreignKey: "purchase_order_id", as: "gates" });

// EtsyOrderItemModel
EtsyOrderItemModel.belongsTo(OrdersModel, { foreignKey: "order_id", as: "etsyOrder" });
OrdersModel.hasMany(EtsyOrderItemModel, { foreignKey: "order_id", as: "etsyOrderItems" });

// CustomOrderItemModel
CustomOrderItemModel.belongsTo(OrdersModel, { foreignKey: "order_id", as: "customOrder" });
OrdersModel.hasMany(CustomOrderItemModel, { foreignKey: "order_id", as: "customOrderItems" });

// ShopifyOrderItemModel
ShopifyOrderItemModel.belongsTo(OrdersModel, { foreignKey: "order_id", as: "shopifyOrder" });
OrdersModel.hasMany(ShopifyOrderItemModel, { foreignKey: "order_id", as: "shopifyOrderItems" });

// Department Jobs Associations
DepartmentJobsModel.belongsTo(UsersModel, { foreignKey: "user_id", as: "user" });
UsersModel.hasMany(DepartmentJobsModel, { foreignKey: "user_id", as: "departmentJobs" });

const db = {
  sequelize,
  AddressModel,
  CartoonModel,
  CategoryModel,
  CustomersModel,
  CustomOrderItemModel,
  DepartmentModel,
  DepartmentJobsModel,
  EtsyOrderItemModel,
  ExpensesModel,
  FinishesModel,
  GateModel,
  JobOrderModel,
  OrdersModel,
  PermissionsModel,
  ProductModel,
  PurchaseOrderModel,
  PurchaseOrderItemModel,
  RawMaterialModel,
  RoleAccessModel,
  RolesModel,
  SellerModel,
  ShippingModel,
  ShopifyOrderItemModel,
  TaxonomyIdModel, 
  UsersModel,
  VariantModel,
};

// Export models and Sequelize instance
export default db;