const { ObjectId } = require("mongodb");

class OrderDetailsService {
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    constructor(client) {
        this.Order = client.db().collection("orderdetails");
    }
    extractOrderData(payload) {
        const order = {
            mskhId: payload.mskhId,
            userEmail:payload.userEmail,
            hangHoa: payload.hangHoa,
            soLuongTong: payload.soLuongTong,
            giaTong: payload.giaTong,
            giamGia: payload.giamGia,
            giaDaGiam: payload.giaDaGiam,
            ngayDatHang: payload.ngayDatHang,
            phuongThucThanhToan:payload.phuongThucThanhToan,
            trangThaiDonHang: payload.trangThaiDonHang,
        };
        // Remove undefined fields
        Object.keys(order).forEach(
            (key) => order[key] === undefined && delete order[key]
        );
        return order;
    }

    async createOrderDetails(payload) {
        try {
            const orderData = this.extractOrderData(payload);
            const result = await this.Order.insertOne(orderData);
            if (result.insertedId) {
                return result.insertedId;
            } else {
                throw new Error("Failed to create the order.");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async find(filter) {
        const cursor = await this.Order.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        try {
            return await this.Order.findOne({ _id: ObjectId(id) });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getAllOrderDetailsByCustomerId(mskhId) {
        try {
            const orders = await this.find({ mskhId });
            return orders;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(id, payload) {
        try {
            const filter = { _id: new ObjectId(id) }; // Use 'new' to create a new ObjectId instance
            const update = this.extractOrderData(payload);
            const result = await this.Order.updateOne(filter, { $set: update });
            if (result.matchedCount === 1) {
                return result.modifiedCount === 1;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const result = await this.Order.deleteOne({ _id: ObjectId(id) });
            return result.deletedCount === 1;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteAll() {
        try {
            const result = await this.Order.deleteMany({});
            return result.deletedCount;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async findFavorite() {
        try {
            return await this.find({ favorite: true });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getOrdersByCustomerId(mskhId) {
        try {
            
            const orders = await this.find({ mskhId });
            return orders;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async removeProductFromOrder(mskhId, mshh) {
        try {
            const filter = { mskhId };
            const update = {
                $pull: { hangHoa: { mshh } }
            };
            const result = await this.Order.updateOne(filter, update);

            return result.modifiedCount === 1;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getAllOrderDetails() {
        try {
            const orders = await this.find({}); // Fetch all order details
            return orders;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}
module.exports = OrderDetailsService;