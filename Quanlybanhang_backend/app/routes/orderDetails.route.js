const express = require("express");
const router = express.Router();
const orderDetailsController = require("../controllers/orderDetails.controller");

// Định nghĩa các route của orderDetails
router.post("/", orderDetailsController.createOrderDetails);

router.get('/customer/:mskhId', orderDetailsController.getAllOrderDetailsByCustomerId);
// Thêm các route khác cần thiết...
router.get("/orderdetails", orderDetailsController.getAllOrderDetails);
module.exports = router;
