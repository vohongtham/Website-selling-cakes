const express = require("express");
const orders = require("../controllers/order.controller");

const router = express.Router();

router.route("/")  
    .get(orders.findAll)
    // .post(orders.create)
    .delete(orders.deleteAll);

router.route("/soluong/:mskhId")
    .get(orders.getTotalQuantityByCustomerId);

router.post("/:mskhId/add-product", orders.addHangHoa);

router.route("/:mskhId")
    .get(orders.getOrdersByCustomerId)

router.delete("/:mskhId/deleteProduct/:mshh", orders.removeHangHoa);

router.delete("/:mskhId/clearCart", orders.deleteByCustomerId);

router.put("/:mskhId/increase-quantity/:mshh", orders.increaseQuantity);

    // Thêm route cho việc giảm số lượng hàng hóa
router.put("/:mskhId/decrease-quantity/:mshh", orders.decreaseQuantity);



// router.route("/:id")
//     .get(orders.findOne)
//     .put(orders.update)
//     .delete(orders.delete);

module.exports = router;