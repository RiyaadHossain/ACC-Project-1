const express = require('express');
const router = express.Router()
const controller = require("../Controller/brandController")

router.route("/")
    .get(controller.getBrands)
    .post(controller.postBrand)

router.route("/:id")
    .get(controller.getBrand)
    .patch(controller.updateBrand)
    .delete(controller.deleteBrand)

module.exports = router