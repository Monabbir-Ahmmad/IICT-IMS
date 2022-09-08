import express from "express";
import { check } from "express-validator";
import { validationCheck } from "../middleware/validationMiddleware.js";
import procurementController from "../controllers/procurementController.js";

const procurementRoute = express.Router();

procurementRoute
  .route("/create")
  .post(
    [
      check("title").notEmpty().withMessage("Title is required."),
      check("procurementCategory")
        .notEmpty()
        .withMessage("Procurement category is required."),
      check("estimatedTotalPrice")
        .notEmpty()
        .withMessage("Estimated total price is required."),
      check("deadline").notEmpty().withMessage("Deadline is required."),
      check("products").notEmpty().withMessage("Products are required."),
    ],
    validationCheck,
    procurementController.createProcurment
  );

export default procurementRoute;
