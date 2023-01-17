import { useState } from "react";
import BlogData from "./BlogData";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Blog = ({ blog, addLike, handleDelete, user }) => {
  const [show, setShow] = useState(false);
  const blogDetailToShow = show ? (
    <BlogData blog={blog} addLike={addLike} />
  ) : (
    ""
  );
  console.log("blogBlog", blog.user.name);
  console.log("userBlog", user.name);
  const deleteButtonToShow =
    blog.user.name === user.name ? (
      <Button handleClick={handleDelete} text="delete" />
    ) : (
      ""
    );

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <Button
        handleClick={() => setShow(!show)}
        text={show ? "hide" : "show"}
      />
      <div>{blogDetailToShow}</div>
      <div>{deleteButtonToShow}</div>
    </div>
  );
};

export default Blog;
