const validator = require('validator');

exports.arrayImageValidate = value => {
    if (!Array.isArray(value)) {
        return false
    }

    let isValid
    value.forEach(img => {
        if (!validator.isURL(img)) isValid = false
    })
    return isValid
}