const express = require('express');
const router = express.Router()
const controller = require("../Controller/productController")

router.route("/")
    .get(controller.getProducts)
    .post(controller.postProduct)

router.route("/bulk-update").patch(controller.bulkUpdateProducts)

// * Keep the dynamic route at the ending
router.route("/:id")
    .get(controller.getProduct)
    .patch(controller.updateProduct)
    .delete(controller.deleteProduct)

module.exports = router