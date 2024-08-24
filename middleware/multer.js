const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = '';
        
        if (file.fieldname === 'profileImage') {
            uploadPath = 'uploads/profile_images/';
        } else if (file.fieldname === 'image') {
            uploadPath = 'uploads/blog_images/';
        } else {
            uploadPath = 'uploads/other_images/';
        }
        
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const extname = path.extname(file.originalname);
        cb(null, file.fieldname +Date.now()  + extname);  // Append timestamp to ensure unique filenames
    },
});

// File filter configuration
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images only!');
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload;
