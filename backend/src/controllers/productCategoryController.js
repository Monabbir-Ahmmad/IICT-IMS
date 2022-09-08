import asyncHandler from "express-async-handler";
import productCategoryService from "../service/productCategoryService.js";

const createProductCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const result = await productCategoryService.createProductCategory(name);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

export default { createProductCategory };
