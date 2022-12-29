import { useState } from "react";
import BlogData from "./BlogData";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false);
  const blogDetailToShow = show ? <BlogData blog={blog} /> : "";

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <Button
        handleClick={() => setShow(!show)}
        text={show ? "hide" : "show"}
      />
      <div>{blogDetailToShow}</div>
    </div>
  );
};

export default Blog;
