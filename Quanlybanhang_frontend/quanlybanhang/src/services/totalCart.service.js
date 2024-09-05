import createApiClient from "./api.service";

class CartService {
    constructor(baseUrl = "/api/order/soluong") {
        this.api = createApiClient(baseUrl);
    }
    
    async getTotalQuantityByCustomerId(mskhId) {
        return (await this.api.get(`/${mskhId}`)).data;
    }
    
}
export default new CartService();
