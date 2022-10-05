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

exports.getStockByIdService = async (id) => {
    const product = await Stock.findById(id).populate("productId")
        .populate("suppliedBy.id").populate("store.id").populate("brand.id");
    return product;
}

exports.updateStockById = async (id) => {
    const product = await Stock.findByIdAndUpdate()
    return product;
}