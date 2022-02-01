const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../storage/img"),
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    }
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|svg|SVG|JPG|PNG|JPEG/; //COMENTARIO: aca iran los tipos de archivos que aceptaremos, para este caso archivos de imagen
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true)
        }
        cb('error, la extension del archivo debe ser jpeg||jpg||png||svg||SVG||JPG||PNG||JPEG')
    },
});

module.exports = upload;