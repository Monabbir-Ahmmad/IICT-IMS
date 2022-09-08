import ProductCategory from "../models/productCategoryModel.js";
import HttpError from "../utils/httpError.js";

const createProductCategory = async (name) => {
  const productCategory = await ProductCategory.findOne({
    where: { name: name },
  });

  if (productCategory) {
    return {
      success: false,
      error: new HttpError(409, "Product category already exists."),
    };
  }

  const result = await ProductCategory.create({ name });

  return result.id
    ? {
        success: true,
        body: {
          id: result.id,
          name: result.name,
        },
      }
    : {
        success: false,
        error: new HttpError(400, "Failed to create product category."),
      };
};

export default { createProductCategory };
