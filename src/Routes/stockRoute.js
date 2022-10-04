const express = require("express");
const router = express.Router();
const stockController = require("../Controller/stockController");

router
    .route("/")
    .get(stockController.getProductsFromStock)
    .post(stockController.createProductInStock);

router
    .route("/:id")
    .get(stockController.getStockById)
    .patch(stockController.updateStockById);

module.exports = router;