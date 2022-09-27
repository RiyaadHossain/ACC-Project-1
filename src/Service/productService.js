const Product = require("../Model/Product")

/* ------------ Get Products Service ------------ */
exports.getProductsService = async () => {
    /* 
        #Query Practice----------------

        1. Product.find({ name: "PC", price: 80000 })
        2. Product.find({ $or: [{name: "PC"}, {price: 500}] })
        3. Product.find({}, "name -_id") || Product.find({}).select("name")
        4. Product.find({ status: { $ne: "out-of-stock" } })
        5. Product.find({ price: {$lt: 50000} })
        6. Product.find({ name: {$in: ["PC", "T-shirt"]} })
        7. Product.find({}).sort("-price")
        8. Product.find({}).limit(5)
        9. Product.where("name").equals("PC") - Product.where("price").gt(50000).lt(81000)

    */
    const products = await Product.find({})
    return products
}

/* ------------ Post Product Service ------------ */
exports.postProductService = async (data) => {
    const newProduct = new Product(data)

    // * Do Something based on user's input before saving the data. [save() method is handy here] / Also can be achived by 'Pre Middleware' in Model
    /* if (newProduct.quantity === 0) {
        newProduct.status = "out-of-stock"
    } */

    const product = await newProduct.save()
    product.logger()
    return product
}