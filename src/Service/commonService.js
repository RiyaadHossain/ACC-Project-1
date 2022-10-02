

/*  To check the data's existence */
exports.isExist = async (id, model) => {
    const result = await model.findById(id)
    return result
}