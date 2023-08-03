const multer = require('multer')


const storage = multer.diskStorage({

});

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error('image only supported'), false)
    }
}


const fileSize = {
    limits: 1024 * 1024 * 10
}

const upload = multer ({
    storage,
    fileFilter,
    fileSize
})

module.exports = upload