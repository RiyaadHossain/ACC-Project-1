const express = require('express');
const router = express.Router()
const controller = require("../Controller/productController")
const upload = require("../Middleware/upload")

router.route("/")
    .get(controller.getProducts)
    .post(controller.postProduct)

router.patch("/bulk-update", controller.bulkUpdateProducts)
router.delete("/bulk-delete", controller.bulkDeleteProducts)

router.route("/upload-photo").post(upload.single("image"), controller.imageUpload)

// * Keep the dynamic route at the ending
router.route("/:id")
    .get(controller.getProduct)
    .patch(controller.updateProduct)
    .delete(controller.deleteProduct)


module.exports = router