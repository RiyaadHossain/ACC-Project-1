const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')


router.route('/')
    .get(userController.getUsers)
    .post(userController.createUser)
// .post(userController.applyAsSupplier)

router.route("/signin")
    .post(userController.signIn)


router.route("/:id")
// .get(productController.getProductById)

module.exports = router