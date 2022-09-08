import express from "express";
import { check } from "express-validator";
import { validationCheck } from "../middleware/validationMiddleware.js";
import procurementController from "../controllers/procurementController.js";
import productCategoryController from "../controllers/productCategoryController.js";

const productCategoryRoutes = express.Router();

productCategoryRoutes
  .route("/create")
  .post(
    [check("name").notEmpty().withMessage("Category name is required.")],
    validationCheck,
    productCategoryController.createProductCategory
  );

export default productCategoryRoutes;
