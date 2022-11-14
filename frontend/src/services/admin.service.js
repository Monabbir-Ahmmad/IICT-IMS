import {
  APPROVE_PROCUREMENT,
  APPROVE_PURCHASE_ORDER,
  APPROVE_SUPPLIER,
  APPROVE_USER,
  GET_PENDING_COUNTS,
  GET_PENDING_PROCUREMENTS,
  GET_PENDING_PURCHASE_ORDERS,
  GET_PENDING_SUPPLIERS,
  GET_PENDING_USERS,
  REJECT_PROCUREMENT,
  REJECT_SUPPLIER,
  REJECT_USER,
} from "../constants/apiLinks";
import api from "./api";

class AdminService {
  async getPendingCounts() {
    return await api().get(GET_PENDING_COUNTS);
  }

  async getPendingUsers() {
    return await api().get(GET_PENDING_USERS);
  }

  async approveUser(userId) {
    return await api().put(`${APPROVE_USER}/${userId}`);
  }

  async rejectUser(userId) {
    return await api().delete(`${REJECT_USER}/${userId}`);
  }

  async getPendingSuppliers() {
    return await api().get(GET_PENDING_SUPPLIERS);
  }

  async approveSupplier(supplierId) {
    return await api().put(`${APPROVE_SUPPLIER}/${supplierId}`);
  }

  async rejectSupplier(supplierId) {
    return await api().delete(`${REJECT_SUPPLIER}/${supplierId}`);
  }

  async getPendingProcurements() {
    return await api().get(GET_PENDING_PROCUREMENTS);
  }

  async approveProcurement(procurementId) {
    return await api().put(`${APPROVE_PROCUREMENT}/${procurementId}`);
  }

  async rejectProcurement(procurementId) {
    return await api().delete(`${REJECT_PROCUREMENT}/${procurementId}`);
  }

  async getPendingPurchaseOrders() {
    return await api().get(GET_PENDING_PURCHASE_ORDERS);
  }

  async approvePurchaseOrder(purchaseOrderId) {
    return await api().put(`${APPROVE_PURCHASE_ORDER}/${purchaseOrderId}`);
  }
}

export default new AdminService();
