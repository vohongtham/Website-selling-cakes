import createApiClient from "./api.service";

class OrderService {
    constructor(baseUrl = "/api/order") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        console.log((await this.api.get("/")).data);
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async addHangHoa(mskhId, productData) {
        return (await this.api.post(`/${mskhId}/add-product`, productData)).data;
    }
    async getOrdersByCustomerId(mskhId) {
        return (await this.api.get(`/${mskhId}`)).data;
    }
    async removeHangHoa(mskhId, mshh) {
        return (await this.api.delete(`/${mskhId}/deleteProduct/${mshh}`)).data;
    }
    async increaseQuantity(mskhId, mshh, quantity) {
        return (await this.api.put(`/${mskhId}/increase-quantity/${mshh}`, {quantity})).data;
    }
    async decreaseQuantity(mskhId, mshh, quantity) {
        return (await this.api.put(`/${mskhId}/decrease-quantity/${mshh}`, {quantity})).data;
    }
    async clearCart(mskhId) {
        return (await this.api.delete(`/${mskhId}/clearCart`)).data;
    }

}
export default new OrderService();
