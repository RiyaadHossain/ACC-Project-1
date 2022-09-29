
const services = require("../Service/productService")

/* ------------ Get Products ------------ */
exports.getProducts = async (req, res) => {
    try {
        const products = await services.getProductsService()
        res.status(201).json({ status: "Successful", message: "Product data got successfully", data: products })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "Fail", error: error.message })
    }
}

/* ------------ Get Product ------------ */
exports.getProduct = async (req, res) => {

    const { id } = req.params
    
    try {
        const product = await services.getProductService(id)
        res.status(201).json({ status: "Successful", message: "Product data got successfully", data: product })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "Fail", error: error.message })
    }
}

/* ------------ Post Product ------------ */
exports.postProduct = async (req, res) => {

    try {
        const product = await services.postProductService(req.body)
        res.status(201).json({ status: "Successful", message: "Product data store to DB successfully", data: product })

    } catch (error) {
        res.status(500).json({ status: "Fail", error: error.message })
    }

}

/* ------------ Update Product ------------ */
exports.updateProduct = async (req, res) => {

    const { id } = req.params

    try {
        const product = await services.updateProductService(id, req.body)
        res.status(201).json({ status: "Successful", message: "Product data updated successfully"})

    } catch (error) {
        res.status(500).json({ status: "Fail", error: error.message })
    }

}

/* ------------ Bulk Update Products ------------ */
exports.bulkUpdateProducts = async (req, res) => {

    const { ids, data } = req.body

    try {
        const product = await services.updateProductsService(ids, data)
        if (product.modifiedCount) {
            res.status(201).json({ status: "Successful", message: "Multiple Products data updated successfully"})
        }

    } catch (error) {
        res.status(500).json({ status: "Fail", error: error.message })
    }

}

/* ------------ Delete Product ------------ */
exports.deleteProduct = async (req, res) => {

    const { id } = req.params

    try {
        const product = await services.deleteProductService(id)
        console.log(product)
        res.status(201).json({ status: "Successful", message: "Product data deleted successfully"})

    } catch (error) {
        res.status(500).json({ status: "Fail", error: error.message })
    }

}