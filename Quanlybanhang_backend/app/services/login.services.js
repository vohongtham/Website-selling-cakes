//const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

class LoginService {
    constructor(client) {
        this.Employee = client.db().collection("users"); // Assuming you have a "users" collection
        this.Employee.createIndex({ email: 1 }, { unique: true });// email la duy nhat
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


    async register(payload) {
        const employeeData = this.extractEmployeeData(payload);
        try {
            // Thêm tài liệu mới vào collection "contacts"
            const result = await this.Employee.insertOne(employeeData);

            // Kết quả sẽ chứa thông tin về tài liệu đã được thêm
            if (result.insertedId) {
                // Nếu có insertedId, tài liệu đã được thêm thành công
                return { success: true, message: "Tạo tài khoản thành công." };
            } else {
                // Nếu không có insertedId, tài liệu không được thêm
                // return { success: false, message: "Tạo tài liệu không thành công" };
                return { success: false, message: "Lỗi khi tạo tài khoản: " + error.message };
            }
        } catch (error) {
            if (error.code === 11000) {
                if (error.message.includes("email")) {
                    return { success: false, message: "Email đã tồn tại, không thể tạo mới." };
                }
            } else {
                console.error(error);
                return { success: false, message: "Lỗi khi tạo tài khoản: " + error.message };
            }

        }
    }

    async loginUser(useremail, userpassword) {
        try {
            // Find the user by either name or phone (usernameOrEmail)
            const user = await this.Employee.findOne({
                $or: [{ email: useremail }, { password: userpassword }],
            });
            console.log(user);
            
            if (!user) {
                throw new Error("User not found");
            }
           
            const isPasswordValid = await bcrypt.compare(userpassword, user.password);
            
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }
            
            console.log(user);
            return user;
        } catch (error) {
            
            throw error;
        }
    }

    async updateUser(id, updatedUserData) {
        try {
            const result = await this.Employee.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedUserData }
            );
    
            if (result.matchedCount > 0) {
                return { success: true, message: 'User updated successfully' };
            } else {
                return { success: false, message: 'User not found or update failed' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Error updating user: ' + error.message };
        }
    }
    async getUserById(id) {
        try {
            const user = await this.Employee.findOne({ _id: new ObjectId(id) });
    
            if (!user) {
                return { success: false, message: "User not found" };
            }
    
            // Remove the hashed password from the user object before returning
            const { password: _, ...userWithoutPassword } = user;
            return { success: true, user: userWithoutPassword }; // Modify this line
        } catch (error) {
            console.error(error);
            return { success: false, message: "Error getting user: " + error.message };
        }
    }

}
module.exports = LoginService;
