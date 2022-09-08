import { DataTypes } from "sequelize";
import { database } from "../config/databaseConfig.js";
import ProductCategory from "./productCategoryModel.js";

const Procurement = database.define("procurement", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: { notEmpty: true },
  },
  estimatedTotalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { notEmpty: true },
  },
});

ProductCategory.hasMany(Procurement, {
  as: "procurement",
  foreignKey: "procurementCategoryId",
  onDelete: "CASCADE",
});

Procurement.belongsTo(ProductCategory, {
  as: "procurementCategory",
  foreignKey: "procurementCategoryId",
  onDelete: "CASCADE",
});

await Procurement.sync();

export default Procurement;
