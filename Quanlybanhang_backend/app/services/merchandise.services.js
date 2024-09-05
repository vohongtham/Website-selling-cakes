const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");

class MerchandiseService {
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    constructor(client) {
        this.Merchandise = client.db().collection("merchandise");
        // ma so hang hoa la duy nhat
        this.Merchandise.createIndex({ mshh: 1 }, { unique: true });
        
    }
    extractMerchandiseData(payload) {
        const merchandise = {
            mshh: payload.mshh,
            tenhh: payload.tenhh,
            //motahh: payload.motahh,
            hinhhanghoa: payload.hinhhanghoa,
            gia: payload.gia,
            // soluonghang: payload.soluonghang,
            //ghichu: payload.ghichu,
        };
        // Remove undefined fields
        Object.keys(merchandise).forEach(
            (key) => merchandise[key] === undefined && delete merchandise[key]
        );
        // kiem tra ma so hang hoa da co trong db chua
        
        return merchandise;
    }

    async create(payload) {
        // Trích xuất dữ liệu từ payload
        const merchandiseData = this.extractMerchandiseData(payload);
        try {
            // Thêm tài liệu mới vào collection "contacts"
            const result = await this.Merchandise.insertOne(merchandiseData);

            // Kết quả sẽ chứa thông tin về tài liệu đã được thêm
            if (result.insertedId) {
                // Nếu có insertedId, tài liệu đã được thêm thành công
                return result;
            } else {
                // Nếu không có insertedId, tài liệu không được thêm
                // return { success: false, message: "Tạo tài liệu không thành công" };
                throw new Error("Tạo tài liệu không thành công: " + error.message);
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            // console.error(error);
            if (error.code === 11000) {
                return { success: false, message: "Tên đã tồn tại, không thể tạo tài liệu mới." };
            } else {
                console.error(error);
                return { success: false, message: "Lỗi khi tạo tài liệu: " + error.message };
            }
            
        }
    }

    async find(filter) {
        const cursor = await this.Merchandise.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Merchandise.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        // console.log(id, payload)
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };

        const update = this.extractMerchandiseData(payload);
        const result = await this.Merchandise.findOneAndUpdate(
            filter,
            { $set: update },
            { new: true }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Merchandise.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Merchandise.deleteMany({});
        return result.deletedCount;
    }

    async findFavorite() {
        return await this.find({ favorite: true });
    }

}
module.exports = MerchandiseService;