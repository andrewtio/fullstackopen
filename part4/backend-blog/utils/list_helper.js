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
  const likes = blogs.map((likes) => {
    return likes.likes;
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

module.exports = {
  dummy,
  totalLikes,
};
