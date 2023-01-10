const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// GET
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

// POST
blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  console.log("body", body);

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

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

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

// PUT
blogsRouter.put("/:id", async (request, response) => {
  const { user, title, author, url, likes } = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {
    user,
    title,
    author,
    url,
    likes,
  });
  response.json(updatedBlog);
});

// DELETE
blogsRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(id).populate("user");

  if (user._id.toString() !== blog.user._id.toString()) {
    return response.status(401).json({
      error: "You are not authorized to delete this blog",
      user: user._id,
      blogUser: blog.user._id,
    });
  }

  await Blog.findByIdAndRemove(id);
  response.status(204).end("deleted");
});

module.exports = blogsRouter;
