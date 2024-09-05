import createApiClient from "./api.service";

class RegisterService {
    constructor(baseUrl = "/api/user") {
        this.api = createApiClient(baseUrl);
    }
    async register(data) {
        return (await this.api.post("/register", data)).data;
    }
    async getUserById(id) {
        return (await this.api.get(`/${id}`)).data;
    }
}
export default new RegisterService();