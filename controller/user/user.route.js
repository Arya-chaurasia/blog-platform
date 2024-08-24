const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const upload = require("../../middleware/multer");


router.post('/sign-up', upload.single('profileImage'), userController.register);

router.post('/login', userController.login)





module.exports = router;