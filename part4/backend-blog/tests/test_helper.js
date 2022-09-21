const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "New blog post",
    author: "Tio",
    url: "www.tio.com",
    likes: 1,
    id: "63077a299c7f62366fed49d3",
  },
  {
    title: "Ditha",
    author: "Kanzlei",
    url: "www.ditha.com",
    likes: 5,
    id: "630cb9f7fd5ec376f516f9a1",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((note) => note.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
