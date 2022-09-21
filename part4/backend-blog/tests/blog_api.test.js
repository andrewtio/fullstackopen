const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 10000);

test("there are two blogs", async () => {
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(2);
});

test("the first blog is about new blog post", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].title).toBe("New blog post");
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("a specific blog title is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);
  expect(contents).toContain("New blog post");
  expect(contents).toContain("Ditha");
});

afterAll(() => {
  mongoose.connection.close();
});
