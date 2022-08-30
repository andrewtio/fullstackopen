const dummy = (blogs) => {
  const reducer = (sum, item) => {
    console.log("sum", sum);
    console.log("item", item);
    return sum + item;
  };

  return blogs.length === 0 ? 1 : blogs.reduce(reducer, 0) / blogs.length;
};

const totalLikes = (likes) => {
  console.log("likes", likes);
  const result = likes.map((likes) => {
    return likes.likes;
  });
  console.log("result", result);

  const reducer = (sum, result) => {
    console.log("sum", sum);
    console.log("result", result);
    return sum + result;
  };

  console.log("reducer", result.reduce(reducer, 0));
  return likes.length === 0 ? 0 : result.reduce(reducer, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
