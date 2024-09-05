const express = require("express");
const employees = require("../controllers/employee.controller");

const router = express.Router();

router.route("/")  
    .get(employees.findAll)
    .post(employees.create)
    .delete(employees.deleteAll);

// router.route("/favorite")
//     .get(contacts.findAllFavorite);

router.route("/:id")
    .get(employees.findOne)
    .put(employees.update)
    .delete(employees.delete);

module.exports = router;