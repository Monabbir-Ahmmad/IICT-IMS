import {
  CREATE_DIRECT_PURCHASE,
  GET_DIRECT_PURCHASE,
  GET_DIRECT_PURCHASE_LIST,
} from "../constants/apiLinks";
import api from "./api";

class DirectPurchaseService {
  async create(data) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("categoryId", data.categoryId);
    formData.append("purchaseDate", data.purchaseDate);
    formData.append("supplierName", data.supplierName);
    formData.append("supplierAddress", data.supplierAddress);
    formData.append("supplierContact", data.supplierContact);
    formData.append("voucher", data.voucherImage);

    data.products.forEach((product, index) => {
      product.id && formData.append(`products[${index}].id`, product.id);
      formData.append(`products[${index}].name`, product.name);
      formData.append(`products[${index}].manufacturer`, product.manufacturer);
      formData.append(`products[${index}].details`, product.details);
      formData.append(`products[${index}].quantity`, product.quantity);
      formData.append(`products[${index}].unitPrice`, product.unitPrice);
      product.warrantyExpiryDate &&
        formData.append(
          `products[${index}].warrantyExpiryDate`,
          product.warrantyExpiryDate
        );
    });

    return await api("multipart/form-data").post(
      CREATE_DIRECT_PURCHASE,
      formData
    );
  }

  async getList(filter, sort, pageNumber = 0, pageSize = 20) {
    return await api().get(GET_DIRECT_PURCHASE_LIST, {
      params: {
        ...filter,
        ...sort,
        pageNumber,
        pageSize,
      },
    });
  }

  async get(id) {
    return await api().get(`${GET_DIRECT_PURCHASE}/${id}`);
  }
}

export default new DirectPurchaseService();
