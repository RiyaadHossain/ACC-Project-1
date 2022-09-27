const express = require('express');
const router = express.Router()
const controller = require("../Controller/productController")

router.route("/").get(controller.getProducts).post(controller.postProduct)

module.exports = router