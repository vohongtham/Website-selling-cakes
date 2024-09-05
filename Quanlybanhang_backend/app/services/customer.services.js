const { ObjectId } = require("mongodb");

class CustomerService {
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    constructor(client) {
        this.Customer = client.db().collection("users");
    }
    extractCustomerData(payload) {
        const customer = {
            mshk: payload.mskh,
            hotenkh: payload.hotenkh,
            email: payload.email,
            password: payload.password,
            diachi: payload.diachi,
            sdt: payload.sdt, 
        };
        // Remove undefined fields
        Object.keys(customer).forEach(
            (key) => customer[key] === undefined && delete customer[key]
        );
        return customer;
    }

    async create(payload) {
        const customer = this.extractCustomerData(payload);
        const result = await this.Customer.findOneAndUpdate(
            customer,
            { $set: { favorite: customer.favorite === true } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Customer.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Customer.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };

        const update = this.extractCustomerData(payload);
        const result = await this.Customer.findOneAndUpdate(
            filter,
            { $set: update },
            { new: true }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Customer.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Customer.deleteMany({});
        return result.deletedCount;
    }

    async findFavorite() {
        return await this.find({ favorite: true});
    }

}

module.exports = CustomerService;