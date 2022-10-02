const Brand = require("../Model/Brand")
const services = require("../Service/brandService")
const { isExist } = require("../Service/commonService")

/* ------------ Get Brands ------------ */
exports.getBrands = async (req, res) => {

    try {
        const brands = await services.getBrandsService()
        res.status(201).json({ status: "Successful", message: "Brands data got successfully", data: brands })
    } catch (error) {
        res.status(500).json({ status: "Fail", error: error.message })
    }

}

/* ------------ Get Brand ------------ */
exports.getBrand = async (req, res) => {

    const { id } = req.params
    const existence = isExist(id, Brand)
    if (!existence) {
        return res.status(402).json({ status: "Fail", message: "Product data didn't exist!" })
    }
    try {
        const brand = await services.getBrandService(id)
        res.status(201).json({ status: "Successful", message: "Brands data got successfully", data: brand })
    } catch (error) {
        res.status(500).json({ status: "Fail", error: error.message })
    }
}

/* ------------ Post Brand ------------ */
exports.postBrand = async (req, res) => {

    try {
        const brand = await services.postBrandService(req.body)
        res.status(201).json({ status: "Successful", message: "Brand data added successfully", data: brand })
    } catch (error) {
        res.status(500).json({ status: "Fail", error: error.message })
    }
}

/* ------------ Update Brand ------------ */
exports.updateBrand = async (req, res) => {

    const { id } = req.params
    const existence = isExist(id, Brand)
    if (!existence) {
        return res.status(402).json({ status: "Fail", message: "Product data didn't exist!" })
    }
    try {
        const brand = await services.updateBrandService(id, req.body)
        res.status(201).json({ status: "Successful", message: "Brand data updated successfully", data: brand })
    } catch (error) {
        res.status(500).json({ status: "Fail", error: error.message })
    }
}

/* ------------ Delete Brand ------------ */
exports.deleteBrand = async (req, res) => {

    const { id } = req.params
    const existence = isExist(id, Brand)
    if (!existence) {
        return res.status(402).json({ status: "Fail", message: "Product data didn't exist!" })
    }
    try {
        const brand = await services.deleteBrandService(id)
        res.status(201).json({ status: "Successful", message: "Brand data deleted successfully", data: brand })
    } catch (error) {
        res.status(500).json({ status: "Fail", error: error.message })
    }
}