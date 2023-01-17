import { useState } from "react";
import BlogData from "./BlogData";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Blog = ({ blog, addLike, handleDelete }) => {
  const [show, setShow] = useState(false);
  const blogDetailToShow = show ? (
    <BlogData blog={blog} addLike={addLike} />
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
      <Button handleClick={handleDelete} text="delete" />
    </div>
  );
};

export default Blog;
