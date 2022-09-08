import { DataTypes } from "sequelize";
import { database } from "../config/databaseConfig.js";

const ProductCategory = database.define("productCategory", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true },
  },
});

await ProductCategory.sync();

export default ProductCategory;
