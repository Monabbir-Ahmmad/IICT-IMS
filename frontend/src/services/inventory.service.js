import api from "./api";

class InventoryService {
  async getAll() {
    return await api().get("/inventroy");
  }
}

export default new InventoryService();
