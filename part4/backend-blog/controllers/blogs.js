const blogsRouter = require("express").Router();
const { response } = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");

// GET
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

// POST
blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  console.log("body", body);

  if (body.title === undefined) {
    return response.status(400).json({
      error: "title missing",
    });
  }

  if (body.url === undefined) {
    return response.status(400).json({
      error: "url missing",
    });
  }

  const user = await User.findById(body.userId);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  response.status(201).json(savedBlog);
});

// PUT
blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {
    title,
    author,
    url,
    likes,
  });
  response.json(updatedBlog);
});

// DELETE
blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
