const express = require("express");
const merchandises = require("../controllers/merchandise.cotroller");

const router = express.Router();

router.route("/")  
    .get(merchandises.findAll)
    .post(merchandises.create)
    .delete(merchandises.deleteAll);

// router.route("/favorite")
//     .get(contacts.findAllFavorite);

router.route("/:id")
    .get(merchandises.findOne)
    .put(merchandises.update)
    .delete(merchandises.delete);

module.exports = router;