const express = require('express')
const router = express.Router()
const supplierController = require('../Controller/supplierController')

router.route('/')
    .get(supplierController.getSuppliers)
    .post(supplierController.createSupplier)

router.route("/:id")
    .get(supplierController.getSupplierById)
    .patch(supplierController.updateSupplierById)

module.exports = router