const express = require('express');
const router = express.Router();
const blogController = require('../blog/blog.controller');
const upload = require('../../middleware/multer');

router.post('/create-blog',upload.single('image'), blogController.createBlog);

router.get('/get-all-blogs', blogController.getAllBlogs);

router.get('/get-specific-blog/:id', blogController.getBlogById);

router.put('/update-blog/:id',upload.single('image'), blogController.updateBlog);

router.delete('/delete-blog/:id', blogController.deleteBlog);

module.exports = router;
