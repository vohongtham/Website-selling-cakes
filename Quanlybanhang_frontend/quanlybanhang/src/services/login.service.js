import createApiClient from "./api.service";

class LoginService {
    constructor(baseUrl = "/api/user") {
        this.api = createApiClient(baseUrl);
    }
    async signin(data) {
        return (await this.api.post("/", data)).data;
    }
    async getUserById(userId) {
        return (await this.api.get(`/${userId}`)).data;
    }
    async updateUser(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
}
export default new LoginService();