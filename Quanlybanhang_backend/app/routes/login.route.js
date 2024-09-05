const express = require("express");
const loginUser = require("../controllers/login.controller");

const router = express.Router();

router.route("/")  
    .post(loginUser.login);

// router.route("/logout")  
//     .post(loginUser.logout);

router.route("/register")  
    .post(loginUser.register);

router.route("/:id")
    .get(loginUser.getUserById);

router.route("/:id")
    .put(loginUser.updateUser);


module.exports = router;