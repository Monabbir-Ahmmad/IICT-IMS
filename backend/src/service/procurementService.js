import Procurement from "../models/procurementModel.js";
import ProcurementProduct from "../models/procurementProductModel.js";
import ProductCategory from "../models/productCategoryModel.js";

const createProcurment = async ({
  title,
  procurementCategory,
  estimatedTotalPrice,
  deadline,
  products,
}) => {
  const category = await ProductCategory.findByPk(procurementCategory.id);

  if (!category) {
    return {
      success: false,
      error: new HttpError(400, "Procurement category not found."),
    };
  }

  const procurement = await Procurement.create({
    title,
    estimatedTotalPrice,
    deadline,
  });

  await procurement.setProcurementCategory(category);

  await products.forEach(async (item) => {
    const product = await ProcurementProduct.create({
      name: item.name,
      manufacturer: item.manufacturer,
      details: item.details,
      estimatedUnitPrice: item.estimatedUnitPrice,
      quantity: item.quantity,
    });

    await product.setProcurement(procurement);
    await product.setProductCategory(category);
  });

  // const result = await Procurement.findByPk(7, {
  //   include: [
  //     {
  //       model: ProcurementProduct,
  //       include: [
  //         {
  //           model: ProductCategory,
  //           as: "productCategory",
  //         },
  //       ],
  //     },
  //     {
  //       model: ProductCategory,
  //       as: "procurementCategory",
  //     },
  //   ],
  // });

  return {
    success: true,
    body: {
      message: "Procurement created successfully.",
    },
  };
};

export default { createProcurment };
