const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = encodeURIComponent(process.argv[2]);

const url = `mongodb+srv://blog:${password}@cluster0.vtyqg.mongodb.net/blogApp?retryWrites=true&w=majority`;

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

mongoose
  .connect(url)
  .then((res) => {
    console.log("connected");

    // Code for create
    const blog = new Blog({
      title: "New blog post",
      author: "Tio",
      url: "www.tio.com",
      likes: 1,
    });

    return blog.save();
  })
  .then(() => {
    console.log("blog saved!");
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
