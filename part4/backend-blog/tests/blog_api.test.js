const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");
const blogsRouter = require("../controllers/blogs");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 10000);

  test("a specific blog title is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    const contents = response.body.map((r) => r.title);
    expect(contents).toContain("New blog post");
    expect(contents).toContain("Ditha");
  });
});

describe("addition of a new blog", () => {
  test("a valid blog post can be added", async () => {
    const newBlog = {
      title: "ZenFein",
      author: "Andrewtio",
      url: "www.zenfein.com",
      likes: 5,
      id: "630cbb6b7fa33829d343e1e6",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).toContain("ZenFein");
  });

  test("if likes property is missing from the request, should default the value to 0", async () => {
    const newBlog = {
      title: "ZenFein",
      author: "Andrewtio",
      url: "www.zenfein.com",
      id: "630cbb6b7fa33829d343e1e6",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd[2].likes).toBe(0);
  });

  test("if title is missing should return respond 400 bad request", async () => {
    const newBlog = {
      author: "Andrewtio",
      url: "www.zenfein.com",
      likes: 5,
      id: "630cbb6b7fa33829d343e1e6",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("if url is missing should return respond 400 bad request", async () => {
    const newBlog = {
      title: "ZenFein",
      author: "Andrewtio",
      likes: 5,
      id: "630cbb6b7fa33829d343e1e6",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("deletion of a blog", () => {
  test("a blog should can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("other tests", () => {
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

  test("expect id to be defined", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
    expect(response.body[1].id).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
