require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Blog = require("./models/blog");
const logger = require("./utils/logger");
const config = require("./utils/config");

app.use(cors());
app.use(express.json());

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const body = request.body;
  console.log("body", body);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
