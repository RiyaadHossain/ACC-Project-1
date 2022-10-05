const express = require('express');
const router = express.Router()
const controller = require("../Controller/productController");
const { authorization } = require('../Middleware/authorization');
const upload = require("../Middleware/uploader");
const { verifyToken } = require('../Middleware/verifyToken');

router.route("/")
    .get(controller.getProducts)
    .post(verifyToken, authorization("admin", "store-manager"), controller.postProduct)

router.patch("/bulk-update", verifyToken, authorization("admin", "store-manager"), controller.bulkUpdateProducts)
router.delete("/bulk-delete", verifyToken, authorization("admin", "store-manager"), controller.bulkDeleteProducts)

router.route("/upload-photo").post(upload.single("image"), controller.imageUpload)

// * Keep the dynamic route at the ending
router.route("/:id")
    .get(controller.getProduct)
    .patch(controller.updateProduct)
    .delete(controller.deleteProduct)


module.exports = router