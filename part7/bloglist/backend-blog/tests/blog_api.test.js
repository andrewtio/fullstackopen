const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
jest.setTimeout(10000);

let token = "";

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(
    helper.initialUser.password,
    saltRounds
  );

  const user = new User({
    username: helper.initialUser.username,
    name: helper.initialUser.name,
    passwordHash,
  });
  const savedUser = await user.save();

  const blogObjects = helper.initialBlogs.map(
    (blog) => new Blog({ ...blog, user: savedUser._id })
  );

  const promiseArray = blogObjects.map((blog) => blog.save());

  const returnedBody = await api.post("/api/login").send({
    username: "root",
    password: "root",
  });

  token = returnedBody.body.token;

  await Promise.all(promiseArray);
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 10000);

  test("a specific blog title is within the returned blogs", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", "bearer " + token);

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
      .set("Authorization", "bearer " + token)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).toContain("ZenFein");
  });

  test("add blog post without token will fail with status code 401 unauthorized", async () => {
    const newBlog = {
      title: "ZenFein",
      author: "Andrewtio",
      url: "www.zenfein.com",
      likes: 5,
      id: "630cbb6b7fa33829d343e1e6",
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
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
      .set("Authorization", "bearer " + token)
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

    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + token)
      .send(newBlog)
      .expect(400);

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

    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + token)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("updating a blog", () => {
  test("a blog should can be updated", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const updatedBlog = {
      title: "DithaS",
      author: "KanzleiS",
      url: "www.ditha.comS",
      likes: 3,
    };

    await api
      .put(`/api/blogs/${blogsAtStart[1].id}`)
      .send(updatedBlog)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[1].title).toBe("DithaS");
    expect(blogsAtEnd[1].author).toBe("KanzleiS");
    expect(blogsAtEnd[1].url).toBe("www.ditha.comS");
    expect(blogsAtEnd[1].likes).toBe(3);
  });
});

describe("deletion of a blog", () => {
  test("a blog should can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", "bearer " + token)
      .expect(204);

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

  // Remove test because the test item is 2 now
  // test("the first blog is about new blog post", async () => {
  //   const response = await api
  //     .get("/api/blogs")
  //     .set("Authorization", "bearer " + token);
  //   expect(response.body[0].title).toBe("New blog post");
  // });

  test("all blogs are returned", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", "bearer " + token);
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("expect id to be defined", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", "bearer " + token);
    expect(response.body[0].id).toBeDefined();
    expect(response.body[1].id).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
