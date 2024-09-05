const { ObjectId } = require("mongodb");

class EmployeeService {
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    constructor(client) {
        this.Employee = client.db().collection("users");
       // this.Employee.createIndex({ msnv: 1 }, { unique: true });
    }
    extractEmployeeData(payload) {
        const employee = {
            hotenuser: payload.hotenuser,
            password: payload.password,
            chucvu: payload.chucvu,
            diachi: payload.diachi,
            email: payload.email,
            sdt: payload.sdt,
        };
        // Remove undefined fields
        Object.keys(employee).forEach(
            (key) => employee[key] === undefined && delete employee[key]
        );
        return employee;
    }

    async create(payload) {
        const employee = this.extractEmployeeData(payload);
        const result = await this.Employee.findOneAndUpdate(
            employee,
            { $set: { favorite: employee.favorite === true } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Employee.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Employee.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
       // console.log(id, payload)
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };

        const update = this.extractEmployeeData(payload);
        const result = await this.Employee.findOneAndUpdate(
            filter,
            { $set: update },
            { new: true }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Employee.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Employee.deleteMany({});
        return result.deletedCount;
    }

    async findFavorite() {
        return await this.find({ favorite: true});
    }

}
module.exports = EmployeeService;