const Blog = require("../../modals/blog.schema");
const apiResponse = require("../../helper/apiResponse");
const upload = require("../../middleware/multer");

exports.createBlog = async (req, res) => {
    const { title, description } = req.body;

    try {
        const blog = await Blog.create({
            title,
            description,
            image: req.file ? req.file.path : null,
        });

        return apiResponse.successResponseWithData(
            res,
            "Blog successfully created",
            blog
        );
    } catch (error) {
        console.log(error, "errorr");
        return apiResponse.ErrorResponse(res, "Error creating blog: " + error);
    }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    return apiResponse.successResponseWithData(
      res,
      "Blogs retrieved successfully",
      blogs, blogs.length
    );
  } catch (error) {
    console.log(error);
    return apiResponse.ErrorResponse(res, "Error retrieving blogs: " + error);
  }
};

exports.getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return apiResponse.ErrorResponse(res, "Blog not found");
    }
    return apiResponse.successResponseWithData(
      res,
      "Blog retrieved successfully",
      blog
    );
  } catch (error) {
    console.log(error);
    return apiResponse.ErrorResponse(res, "Error retrieving blog: " + error);
  }
};

exports.updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return apiResponse.ErrorResponse(res, "Blog not found");
        }

        blog.title = title || blog.title;
        blog.description = description || blog.description;
        blog.image = req.file ? req.file.path : blog.image;

        await blog.save();

        return apiResponse.successResponseWithData(
            res,
            "Blog successfully updated",
            blog
        );
    } catch (error) {
        console.log(error);
        return apiResponse.ErrorResponse(res, "Error updating blog: " + error);
    }
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return apiResponse.ErrorResponse(res, "Blog not found");
    }

    await Blog.findByIdAndDelete(id);

    return apiResponse.successResponse(res, "Blog successfully deleted");
  } catch (error) {
    console.log(error);
    return apiResponse.ErrorResponse(res, "Error deleting blog: " + error);
  }
};
