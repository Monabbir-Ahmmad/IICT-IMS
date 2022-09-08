import { DataTypes } from "sequelize";
import { database } from "../config/databaseConfig.js";
import Procurement from "./procurementModel.js";
import ProductCategory from "./productCategoryModel.js";

const ProcurementProduct = database.define("procurementProduct", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  details: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  estimatedUnitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { notEmpty: true },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { notEmpty: true },
  },
});

ProductCategory.hasMany(ProcurementProduct, { onDelete: "CASCADE" });

ProcurementProduct.belongsTo(ProductCategory, { onDelete: "CASCADE" });

Procurement.hasMany(ProcurementProduct, { onDelete: "CASCADE" });

ProcurementProduct.belongsTo(Procurement, { onDelete: "CASCADE" });

await ProcurementProduct.sync();

export default ProcurementProduct;
