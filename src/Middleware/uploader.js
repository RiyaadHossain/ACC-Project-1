const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: "src/Upload/",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const supportedFile = /jpg|png/;
        const extension = path.extname(file.originalname)
        if (supportedFile.test(extension)) {
            cb(null, true)
            console.log(file.originalname);
        } else {
            cb(new Error("Only jpg & png format is supported."))
        }
    },
    limits: {
        fileSize: 5000000 // 5MB
    }
})

module.exports = upload
