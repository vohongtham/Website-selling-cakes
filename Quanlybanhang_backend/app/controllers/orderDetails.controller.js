const OrderDetailsService = require("../services/orderDetails.services");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.createOrderDetails = async (req, res, next) => {
    try {
        const orderDetailsPayload = req.body; // Get data from the HTTP request
        const orderDetailsService = new OrderDetailsService(MongoDB.client);

        const result = await orderDetailsService.createOrderDetails(orderDetailsPayload);

        return res.send({ id: result });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while creating order details"));
    }
};
// Assuming you have a method named getAllOrderDetailsByCustomerId in your OrderDetailsService

exports.getAllOrderDetailsByCustomerId = async (req, res, next) => {
    try {
        const mskhId = req.params.mskhId; 
        const orderDetailsService = new OrderDetailsService(MongoDB.client);

        const orderDetails = await orderDetailsService.getAllOrderDetailsByCustomerId(mskhId);

        return res.send(orderDetails);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while fetching order details"));
    }
};
exports.getAllOrderDetails = async (req, res, next) => {
    try {
        const orderDetailsService = new OrderDetailsService(MongoDB.client);

        const orderDetails = await orderDetailsService.getAllOrderDetails();

        return res.send(orderDetails);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while fetching all order details"));
    }
};

// Other functions for searching, updating, deleting order details can be added here
