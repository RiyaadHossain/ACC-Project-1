
const services = require("../Service/productService")

/* ------------ Get Products ------------ */
exports.getProducts = async (req, res) => {
    try {
        const products = await services.getProductsService()
        res.status(201).json({ status: "Successful", message: "Product data got successfully", data: products })
    } catch (error) {
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