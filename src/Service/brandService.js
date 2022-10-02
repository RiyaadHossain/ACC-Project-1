const Brand = require("../Model/Brand")

/* ------------ Get Products Service ------------ */
exports.getBrandsService = async () => {
    const brands = await Brand.find()
    return brands
}

/* ------------ Get Product Service ------------ */
exports.getBrandService = async (id) => {
    const brand = await Brand.findById(id)
    return brand
}

/* ------------ Post Products Service ------------ */
exports.postBrandService = async (body) => {
    const result = await Brand.create(body)
    return result
}

/* ------------ Update Product Service ------------ */
exports.updateBrandService = async (id, body) => {
    const result = await Brand.findByIdAndUpdate(id, body, { new: true, runValidators: true }) // runValidators: true - Switch on validation on updated data
    return result
}

/* ------------ Delete Products Service ------------ */
exports.deleteBrandService = async (id) => {
    const result = await Brand.findByIdAndDelete(id)
    return result
}