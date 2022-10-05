
//Model
const Brand = require('../Model/Brand');
const { getProductsFromStocksService, createProductInStockService, getStockByIdService, updateStockById } = require('../Service/stockService');


exports.getProductsFromStock = async (req, res) => {

    const { field, sort, limit = 5, page = 1 } = req.query
    const filter = { ...req.query }
    let query = {}

    const queryOptions = ["sort", "field", "page", "limit"]
    queryOptions.forEach(field => delete filter[field])

    if (field) {
        query["field"] = field.split(',').join(" ")
    }

    if (sort) {
        query["sort"] = sort.split(',').join(" ")
    }

    if (limit) {
        query["limit"] = limit
    }

    if (page) {
        query["skip"] = (page - 1) * Number(limit)
    }

    let queryString = JSON.stringify(filter)
    queryString = JSON.parse(queryString.replace(/\b(gt|gte|lt|lte|e|ne)\b/g, match => `$${match}`)) // For [$gte, $gt, $lte, $lt, $e, $ne] operators

    try {
        const products = await getProductsFromStocksService(queryString, query)

        res.status(200).json({
            status: "success",
            data: products,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message,
        });
    }
};

exports.createProductInStock = async (req, res) => {
    try {
        const product = await createProductInStockService(req.body)

        res.status(200).json({
            status: "success",
            messgae: "data inserted successfully!",
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: " data is not inserted ",
            error: error.message,
        });
    }
};

exports.getStockById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getStockByIdService(id);

        res.status(200).json({
            status: "success",
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
};

exports.updateStockById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await updateStockById(id);

        res.status(200).json({
            status: "success",
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
};