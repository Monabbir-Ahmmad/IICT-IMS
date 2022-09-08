import UserType from "./src/models/userTypeModel.js";
import ProductCategoryModel from "./src/models/productCategoryModel.js";
import ProcurementProductModel from "./src/models/procurementProductModel.js";
import ProcurementModel from "./src/models/procurementModel.js";

const initialUserTypes = ["Administrator", "Normal"];

const seedDatabase = () => {
  initialUserTypes.forEach(async (type, index) => {
    try {
      await UserType.findOrCreate({ where: { privilege: type } });
    } catch (error) {
      console.error(error);
    }

    if (index === initialUserTypes.length - 1)
      console.log("Initial data loaded to database.");
  });
};

export default seedDatabase;
