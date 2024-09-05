import createApiClient from "./api.service";

class EmployeeService {
    constructor(baseUrl = "/api/employee") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        //console.log((await this.api.get("/")).data);
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
}
export default new EmployeeService();
