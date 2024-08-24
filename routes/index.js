const express = require("express");
const app = express();

const userRoutes = require("../controller/user/user.route");
const blogRoutes = require("../controller/blog/blog.route");

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

module.exports = app;
