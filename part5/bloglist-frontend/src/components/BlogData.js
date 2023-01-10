import React from "react";

const BlogData = ({ blog, addLike }) => {
  const Button = ({ text }) => <button onClick={addLike}>{text}</button>;
  return (
    <div>
      <div>Url: {blog.url}</div>
      <div>
        Likes: {blog.likes} <Button text={"like"} />
      </div>
      <div>Author: {blog.author}</div>
    </div>
  );
};

export default BlogData;
