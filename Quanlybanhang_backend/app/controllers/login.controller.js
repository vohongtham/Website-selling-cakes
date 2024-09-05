const bcrypt = require("bcrypt");
const MongoDB = require("../utils/mongodb.util")
const jwt = require("jsonwebtoken");
const ApiError = require("../api-error");
//const UserService = require("../services/login.service"); // Import the login service
const LoginService = require("../services/login.services");
const jwtSecret = process.env.JWT_SECRET || 'defaultsecret';


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Call the login service to authenticate the user
        const loginService = new LoginService(MongoDB.client);
      //  const hashedPassword = await bcrypt.hash(phone, 10);
        const user = await loginService.loginUser(email, password);

        //const contactService = new ContactService(MongoDB.client);
        if (!user) {
            return next(new ApiError(401, "Authentication failed"));
        }

        // Generate a JWT token
        console.log('đã tìm thấy user');
        console.log(jwtSecret);
        const token = jwt.sign({ user }, jwtSecret, {
            expiresIn: "1h", // Set the token expiration time
        });

        res.status(200).json({ message: "Login successful", token });
        
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "Invalid email and password."));
    }
};


exports.register = async (req, res, next) => {
    try {
        const { hotenuser, password, chucvu, diachi, email, sdt} = req.body;

        // bam password
        const hashedPassword = await bcrypt.hash(password, 10);

        req.body.password = hashedPassword;

         // 10 is the number of salt rounds

        const registrationService = new LoginService(MongoDB.client);
        const newUser = await registrationService.register(req.body);

        if (newUser.success) {
            res.status(201).json({ message: "Registration successful" });
        } else {
            return next(new ApiError(500, "Registration failed: " + newUser.message));
        }
        // if (newUser.insertedId) {
        //     // Registration successful
        //     res.status(201).json({ message: "Register successful" });
        // } else {
        //     // Registration failed
        //     return next(new ApiError(500, "Failed to create the register: Registration failed"));
        // }

    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred during registration: "  + error.message));
    }
};
exports.logout = (req, res) => {
     
    try {
        const { tokenUser } = req.body;

        console.log(tokenUser);

        localStorage.removeItem(tokenUser); // Use the correct key for your token
        res.status(200).json({ message: 'Logout successful' });
      
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "Error when logout"));
    }
};
exports.updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params; // Assuming the user ID is in the request parameters
        const updatedUserData = req.body;

        const loginService = new LoginService(MongoDB.client);
        const updateResult = await loginService.updateUser(userId, updatedUserData);

        if (updateResult.success) {
            res.status(200).json({ message: updateResult.message });
        } else {
            return next(new ApiError(500, "User update failed: " + updateResult.message));
        }
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "Error updating user: " + error.message));
    }
};
exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params; // Assuming the user ID is in the request parameters

        const loginService = new LoginService(MongoDB.client);
        const getUserResult = await loginService.getUserById(id);

        if (getUserResult.success) {
            res.status(200).json(getUserResult.user);
        } else {
            return next(new ApiError(404, "User not found: " + getUserResult.message));
        }   
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "Error getting user: " + error.message));
    }
};
exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params; // Assuming the user ID is in the request parameters
        const updatedUserData = req.body;

        const loginService = new LoginService(MongoDB.client);
        const updateResult = await loginService.updateUser(id, updatedUserData);

        if (updateResult.success) {
            res.status(200).json({ message: updateResult.message });
        } else {
            return next(new ApiError(500, "User update failed: " + updateResult.message));
        }
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "Error updating user: " + error.message));
    }
};