import React from "react";

const BlogData = ({ blog, addLike }) => {
  const addBlogLike = (event) => {
    event.preventDefault();
    addLike({
      user: blog.user,
      like: blog.like + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    });
  };

  const Button = ({ text }) => <button onClick={addBlogLike}>{text}</button>;
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
