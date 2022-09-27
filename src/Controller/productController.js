const Product = require("../Model/Product")
const services = require("../Service/productService")

/* ------------ Get Products ------------ */
exports.getProducts = async (req, res) => {
    const products = await services()
}

/* ------------ Post Product ------------ */
exports.postProduct = async (req, res) => {
    const newProduct = new Product(req.body)

    // * Do Something based on user's input before saving the data. [save() method is handy here] / Also can be achived by 'Pre Middleware' in Model
    /* if (newProduct.quantity === 0) {
        newProduct.status = "out-of-stock"
    } */

    try {
        const result = await newProduct.save()
        result.logger()
        res.status(201).json({ status: "Successful", message: "Product data successfully save to the Database", data: result })

    } catch (error) {
        res.status(500).json({ status: "Fail", error: error.message })
    }

}