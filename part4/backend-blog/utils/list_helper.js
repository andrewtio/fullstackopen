const dummy = (blogs) => {
  const reducer = (sum, item) => {
    console.log("sum", sum);
    console.log("item", item);
    return sum + item;
  };
  console.log("reducer", reducer);

  return blogs.length === 0 ? 1 : blogs.reduce(reducer, 0) / blogs.length;
};

module.exports = {
  dummy,
};
