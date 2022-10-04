const Stock = require("../Model/Stock");


exports.getProductsFromStocksService = async (filter, query) => {
    const products = await Stock.find(filter).skip(query.skip)
        .limit(query.limit)
        .select(query.field)
        .sort(query.sort)
    
    return products;
};

exports.createProductInStockService = async (data) => {
    const product = await Stock.create(data);
    return product;
};

// exports.getProductByIdService = async (id) => {
//     const product = await Product.findById(id);
//     return product;
// }

// exports.updateProductByIdService = async (id) => {
//     const product = await Product.findByIdAndUpdate()
//     return product;
// }