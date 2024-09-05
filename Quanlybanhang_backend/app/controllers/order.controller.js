const OrderService = require("../services/order.services");
const MongoDB = require("../utils/mongodb.util")
const ApiError = require("../api-error");


exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const orderService = new OrderService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await orderService.findByName(name);
        } else {
            documents = await orderService.find({});
        }
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const orderService = new OrderService(MongoDB.client);
        //console.log(req.body, req.params.id);
        const document = await orderService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not foud"));
        }
        //return res.send({ message: "Contact was updated successfully" });
        return res.send(req.body);
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not foud"));
        }
        return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, `Could not delete contact with id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const deletedCount = await orderService.deleteAll();
        return res.send({
            message: `${deletedCount} contact were deleted successfully`,
        });
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, "An error occurred while removing contacts")
        );
    }
};

exports.findAllFavorite = async (_req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const documents = await orderService.findFavorite();
        return res.send(documents);
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, "An error occurred while retrieving favorite contacts")
        );
    }
};

// exports.create = async (req, res, next) => {
//     const { mskhId, hangHoa, soLuongTong, giaTong, giamGia, giaDaGiam, ngayDatHang, trangThaiDonHang } = req.body;

//     if (!mskhId || !hangHoa || !soLuongTong || !giaTong || !giamGia || !giaDaGiam || !ngayDatHang || !trangThaiDonHang) {
//         return next(new ApiError(400, "All fields are required when creating a new order"));
//     }

//     try {
//         const orderService = new OrderService(MongoDB.client);
//         const document = await orderService.create(req.body);
//         return res.send(document);
//     } catch (error) {
//         console.error(error);
//         return next(new ApiError(500, "An error occurred while creating the order"));
//     }
// };

exports.getTotalQuantityByCustomerId = async (req, res, next) => {
    const mskhId = req.params.mskhId; // Lấy mskhId từ tham số đường dẫn (hoặc truy vấn)

    if (!mskhId) {
        return next(new ApiError(400, "Customer ID (mskhId) is required"));
    }

    try {
        const orderService = new OrderService(MongoDB.client);

        // Sử dụng orderService để lấy tất cả đơn hàng của khách hàng dựa trên mskhId
        const customerOrders = await orderService.find({ mskhId });

        // Tính tổng số lượng từ các đơn hàng của khách hàng
        const totalQuantity = customerOrders.reduce((acc, order) => {
            order.hangHoa.forEach((product) => {
                if (product.soLuong) {
                    acc += product.soLuong;
                }
            });
            return acc;
        }, 0);

        return res.send({ totalQuantity });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while calculating total quantity"));
    }
};


exports.addHangHoa = async (req, res, next) => {
    const mskhId = req.params.mskhId; // Extract mskhId from the request parameters.
    const newProduct = req.body; // The new product data to add to the order.

    if (!mskhId) {
        return next(new ApiError(400, "Customer ID (mskhId) is required"));
    }

    if (!newProduct) {
        return next(new ApiError(400, "New product data is required"));
    }

    try {
        const orderService = new OrderService(MongoDB.client);

        // First, find the existing order with the specified mskkhId.
        const existingOrder = await orderService.find({ mskhId });

        if (!existingOrder || existingOrder.length === 0) {
            // If the order doesn't exist, create a new order with the provided data structure.
            const newOrderData = {
                mskhId,
                hangHoa: [newProduct],
                soLuongTong: newProduct.soLuong,
                giaTong: newProduct.tongGia,
                giamGia: 0, // Adjust as needed
                giaDaGiam: newProduct.tongGia - 0, // Adjust as needed
                //ngayDatHang: "2023-10-30", // Adjust as needed
                trangThaiDonHang: "Đã thêm vào giỏ hàng", // Adjust as needed
            };

            const newOrder = await orderService.create(newOrderData);
            return res.send(newOrder);
        }

        // Update the existing order based on the new product.
        const updatedOrder = { ...existingOrder[0] }; // Assuming there is only one order per customer.

        if (!updatedOrder.hangHoa) {
            updatedOrder.hangHoa = [];
        }

        // Check if the new product with the same mshh already exists in the order.
        const existingProductIndex = updatedOrder.hangHoa.findIndex(
            (product) => product.mshh === newProduct.mshh
        );

        if (existingProductIndex !== -1) {
            // If the product already exists, increase the soLuong and update tongGia.
            updatedOrder.hangHoa[existingProductIndex].soLuong += newProduct.soLuong;
            updatedOrder.hangHoa[existingProductIndex].tongGia += newProduct.tongGia;
        } else {
            // If the product is new, add it to the hangHoa array.
            updatedOrder.hangHoa.push(newProduct);
        }

        // Recalculate the updated soLuongTong, giaTong, and giaDaGiam for the order.
        updatedOrder.soLuongTong = updatedOrder.hangHoa.reduce(
            (total, product) => total + product.soLuong,
            0
        );
        updatedOrder.giaTong = updatedOrder.hangHoa.reduce(
            (total, product) => total + product.tongGia,
            0
        );
        updatedOrder.giaDaGiam = updatedOrder.giaTong - updatedOrder.giamGia;

        // Update the order in the database with the changes.
        const isUpdated = await orderService.update(updatedOrder._id, updatedOrder);

        if (isUpdated) {
            return res.send(updatedOrder);
        } else {
            return next(new ApiError(500, "Failed to update the order with the new product"));
        }
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while adding the product to the order"));
    }
};

exports.getOrdersByCustomerId = async (req, res, next) => {
    const mskhId = req.params.mskhId; // Lấy mskhId từ tham số đường dẫn (hoặc truy vấn)

    if (!mskhId) {
        return next(new ApiError(400, "Customer ID (mskhId) is required"));
    }

    try {
        const orderService = new OrderService(MongoDB.client);

        // Sử dụng orderService để lấy danh sách đơn hàng của khách hàng dựa trên mskhId
        const customerOrders = await orderService.getOrdersByCustomerId(mskhId);

        return res.send(customerOrders);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while retrieving customer orders"));
    }
};
exports.removeHangHoa = async (req, res, next) => {
    const mskhId = req.params.mskhId;
    const mshhToRemove = req.params.mshh;

    if (!mskhId || !mshhToRemove) {
        return next(new ApiError(400, "Customer ID (mskhId) and Product ID (mshh) are required"));
    }

    try {
        const orderService = new OrderService(MongoDB.client);

        // Find the existing order with the specified mskhId.
        const existingOrder = await orderService.find({ mskhId });

        if (!existingOrder || existingOrder.length === 0) {
            return next(new ApiError(404, "Order not found for the given Customer ID"));
        }

        const updatedOrder = { ...existingOrder[0] }; // Assuming there is only one order per customer.
        
        if (!updatedOrder.hangHoa) {
            updatedOrder.hangHoa = [];
        }

        // Find the index of the product to remove.
        const productIndexToRemove = updatedOrder.hangHoa.findIndex(
            (product) => product.mshh === mshhToRemove
        );

        if (productIndexToRemove !== -1) {
            // Update the total quantity and total price.
            updatedOrder.soLuongTong -= updatedOrder.hangHoa[productIndexToRemove].soLuong;
            updatedOrder.giaTong -= updatedOrder.hangHoa[productIndexToRemove].tongGia;

            // Remove the product from the hangHoa array.
            updatedOrder.hangHoa.splice(productIndexToRemove, 1);

            // Recalculate the updated giaDaGiam for the order.
            updatedOrder.giaDaGiam = updatedOrder.giaTong - updatedOrder.giamGia;

            // Update the order in the database with the changes.
            const isUpdated = await orderService.update(updatedOrder._id, updatedOrder);

            if (isUpdated) {
                return res.send(updatedOrder);
            } else {
                return next(new ApiError(500, "Failed to update the order after removing the product"));
            }
        } else {
            return next(new ApiError(404, "Product not found in the order"));
        }
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while removing the product from the order"));
    }
};
// Trong hàm xử lý API (orders.decreaseQuantity)
exports.decreaseQuantity = async (req, res, next) => {
    const mskhId = req.params.mskhId;
    const mshh = req.params.mshh;
    const { quantity } = req.body;

    if (!mskhId || !mshh || !quantity || quantity < 1) {
        return next(new ApiError(400, "Invalid request data"));
    }

    try {
        const orderService = new OrderService(MongoDB.client);
        const existingOrder = await orderService.find({ mskhId });

        if (!existingOrder || existingOrder.length === 0) {
            return next(new ApiError(404, "Order not found for the given Customer ID"));
        }

        const updatedOrder = { ...existingOrder[0] };

        if (!updatedOrder.hangHoa) {
            updatedOrder.hangHoa = [];
        }

        const productIndexToUpdate = updatedOrder.hangHoa.findIndex(
            (product) => product.mshh === mshh
        );

        if (productIndexToUpdate !== -1) {
            if (updatedOrder.hangHoa[productIndexToUpdate].soLuong >= quantity) {
                updatedOrder.hangHoa[productIndexToUpdate].soLuong -= quantity;

                // Cập nhật lại tổng giá sau khi giảm số lượng
                updatedOrder.hangHoa[productIndexToUpdate].tongGia =
                    updatedOrder.hangHoa[productIndexToUpdate].gia *
                    updatedOrder.hangHoa[productIndexToUpdate].soLuong;

                updatedOrder.soLuongTong -= quantity;
                updatedOrder.giaTong -=
                    quantity * updatedOrder.hangHoa[productIndexToUpdate].gia;
                updatedOrder.giaDaGiam = updatedOrder.giaTong - updatedOrder.giamGia;

                const isUpdated = await orderService.update(
                    updatedOrder._id,
                    updatedOrder
                );

                if (isUpdated) {
                    return res.send(updatedOrder);
                } else {
                    return next(
                        new ApiError(500, "Failed to update the order after decreasing the quantity")
                    );
                }
            } else {
                return next(new ApiError(400, "Quantity is not sufficient to decrease"));
            }
        } else {
            return next(new ApiError(404, "Product not found in the order"));
        }
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(
                500,
                "An error occurred while processing the request to decrease quantity"
            )
        );
    }
};
exports.increaseQuantity = async (req, res, next) => {
    const mskhId = req.params.mskhId;
    const mshh = req.params.mshh;
    const { quantity } = req.body;

    if (!mskhId || !mshh || !quantity || quantity < 1) {
        return next(new ApiError(400, "Invalid request data"));
    }

    try {
        const orderService = new OrderService(MongoDB.client);
        const existingOrder = await orderService.find({ mskhId });

        if (!existingOrder || existingOrder.length === 0) {
            return next(new ApiError(404, "Order not found for the given Customer ID"));
        }

        const updatedOrder = { ...existingOrder[0] };

        if (!updatedOrder.hangHoa) {
            updatedOrder.hangHoa = [];
        }

        const productIndexToUpdate = updatedOrder.hangHoa.findIndex(
            (product) => product.mshh === mshh
        );

        if (productIndexToUpdate !== -1) {
            // Increase the quantity of the existing product.
            updatedOrder.hangHoa[productIndexToUpdate].soLuong += quantity;

            // Update the total price after increasing the quantity.
            updatedOrder.hangHoa[productIndexToUpdate].tongGia =
                updatedOrder.hangHoa[productIndexToUpdate].gia *
                updatedOrder.hangHoa[productIndexToUpdate].soLuong;

            // Update the total quantity, total price, and discounted price for the order.
            updatedOrder.soLuongTong += quantity;
            updatedOrder.giaTong +=
                quantity * updatedOrder.hangHoa[productIndexToUpdate].gia;
            updatedOrder.giaDaGiam = updatedOrder.giaTong - updatedOrder.giamGia;

            const isUpdated = await orderService.update(
                updatedOrder._id,
                updatedOrder
            );

            if (isUpdated) {
                return res.send(updatedOrder);
            } else {
                return next(
                    new ApiError(500, "Failed to update the order after increasing the quantity")
                );
            }
        } else {
            return next(new ApiError(404, "Product not found in the order"));
        }
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(
                500,
                "An error occurred while processing the request to increase quantity"
            )
        );
    }
};

exports.deleteByCustomerId = async (req, res, next) => {
    const mskhId = req.params.mskhId;

    if (!mskhId) {
        return next(new ApiError(400, "Customer ID (mskhId) is required"));
    }

    try {
        const orderService = new OrderService(MongoDB.client);
        const deletedCount = await orderService.deleteByCustomerId(mskhId);

        return res.send({
            message: `${deletedCount} orders for customer ID ${mskhId} were deleted successfully`,
        });
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, `An error occurred while deleting orders for customer ID ${mskhId}`)
        );
    }
};


