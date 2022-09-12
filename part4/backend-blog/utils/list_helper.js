const dummy = (blogs) => {
  const reducer = (sum, item) => {
    console.log("sum", sum);
    console.log("item", item);
    return sum + item;
  };

  return blogs.length === 0 ? 1 : blogs.reduce(reducer, 0) / blogs.length;
};

const totalLikes = (blogs) => {
  console.log("blogs", blogs);
  const likes = blogs.map((blog) => {
    return blog.likes;
  });
  console.log("likes", likes);

  const reducer = (sum, likes) => {
    console.log("sum", sum);
    console.log("result", likes);
    return sum + likes;
  };

  console.log("reducer", likes.reduce(reducer, 0));
  return blogs.length === 0 ? 0 : likes.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const shortenedBlogs = blogs.map((blog) => {
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
    };
  });
  console.log("shortenedBlogs", shortenedBlogs);

  const favoriteBlog = Math.max(...shortenedBlogs.map((o) => o.likes));
  console.log("favoriteBlog", favoriteBlog);

  const favoriteBlogArray = shortenedBlogs
    .filter((blog) => blog.likes === favoriteBlog)
    .map((obj) => {
      return {
        title: obj.title,
        author: obj.author,
        likes: obj.likes,
      };
    });
  console.log("favoriteBlogArray", favoriteBlogArray);

  const favoriteBlogObject = favoriteBlogArray.reduce(
    (previous, current) => current
  );
  console.log("favoriteBlogObject", favoriteBlogObject);

  return favoriteBlogObject;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
