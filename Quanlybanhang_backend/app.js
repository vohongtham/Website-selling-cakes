const express = require("express");
const cors = require("cors");
const customersRouter = require("./app/routes/customer.route");
const employeesRouter = require("./app/routes/employee.route");
const merchandisesRouter = require("./app/routes/merchandise.route");
const ordersRouter = require("./app/routes/order.route");
const loginRouter = require("./app/routes/login.route");
const orderDetailsRouter = require("./app/routes/orderDetails.route");

const ApiError = require("./app/api-error");

const app = express();
const bodyParser = require("body-parser");

app.use(cors());
// app.use(express.json());
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended:true , limit: '50mb'}));

app.get("/", (req, res) => {
    res.json({message: "Welcome to quan ly ban hang."});
});

app.use("/api/customer", customersRouter);
app.use("/api/employee", employeesRouter);
app.use("/api/merchandise", merchandisesRouter);
app.use("/api/order", ordersRouter);
app.use("/api/user", loginRouter);
app.use("/api/order-details", orderDetailsRouter);


app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    });
});

module.exports = app;