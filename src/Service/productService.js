const Product = require("../Model/Product")

/* ------------ Get Products Service ------------ */
exports.getProductsService = async() => {
    const products = await services()
    return products
}

/* ------------ Post Product Service ------------ */
exports.postProductService = async(data) => {
    const newProduct = new Product(req.body)
    
    // * Do Something based on user's input before saving the data. [save() method is handy here] / Also can be achived by 'Pre Middleware' in Model
    /* if (newProduct.quantity === 0) {
        newProduct.status = "out-of-stock"
    } */

    const product = await newProduct.save()
    product.logger()
    return product
}