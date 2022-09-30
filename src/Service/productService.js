const Product = require("../Model/Product")

/*  1. To check the data's existence */
exports.isExist = async (id) => {
    const result = await Product.findById(id)
    return result
}


/* ------------ Get Products Service ------------ */
exports.getProductsService = async (filter, query) => {
    /* 
        #Query Practice_____________________

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

    const products = await Product.find(filter)
        .select(query.field)
        .sort(query.sort)
        .limit(query.limit)
        .skip(query.skip)
    const total = await Product.countDocuments(filter)
    const page = Math.ceil(total / query.limit)

    return { total, page, products, }
}

/* ------------ Get Product Service ------------ */
exports.getProductService = async (id) => {

    const product = await Product.findByIdAndUpdate(id, { $inc: { viewCount: 1 } }, { new: true })
    return product
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

/* ------------ Update Product Service ------------ */
exports.updateProductService = async (id, data) => {

    const product = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true }) // * runValidators - active Schema validation
    return product
}

/* ------------ Bulk Update Products Service ------------ */
exports.updateProductsService = async (products) => {

    // Update multiple doc with multiple data -
    const productsUpdate = []

    products.forEach(product => {
        productsUpdate.push(Product.findByIdAndUpdate(product.id, product.data, { new: true, runValidators: true })) // * runValidators - active Schema validation
    })

    const product = await Promise.all(productsUpdate)

    return product
}

/* ------------ Delete Product Service ------------ */
exports.deleteProductService = async (id) => {

    const product = await Product.findByIdAndDelete(id)
    return product
}

/* ------------ Bulk Update Products Service ------------ */
exports.deleteProductsService = async (ids) => {

    const result = await Product.deleteMany({ _id: ids })
    return result
}