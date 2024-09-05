import createApiClient from "./api.service";

class OderDetailsService {
    constructor(baseUrl = "/api/order-details") {
        this.api = createApiClient(baseUrl);
    }
    
    async addOderDetails(productData) {
        return (await this.api.post("/", productData)).data;
    }
    async getAllOrderDetailsByCustomerId(mskhId) {
        return (await this.api.get(`/customer/${mskhId}`)).data;
    }
    async getAllOrderDetails() {
        return (await this.api.get("/orderdetails")).data;
    }

}
export default new OderDetailsService();
