import asyncHandler from "express-async-handler";
import procurementService from "../service/procurementService.js";

const createProcurment = asyncHandler(async (req, res) => {
  const {
    title,
    procurementCategory,
    estimatedTotalPrice,
    deadline,
    products,
  } = req.body;

  const result = await procurementService.createProcurment({
    title,
    procurementCategory,
    estimatedTotalPrice,
    deadline,
    products,
  });

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

export default { createProcurment };
