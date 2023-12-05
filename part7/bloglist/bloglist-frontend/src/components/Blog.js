import { useState } from "react";
import BlogData from "./BlogData";
import PropTypes from "prop-types";

const ShowButton = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const DeleteButton = ({ handleClick, text }) => (
  <button onClick={handleClick} className="delete">
    {text}
  </button>
);

const Blog = ({ blog, addLike, handleDelete, user }) => {
  const [show, setShow] = useState(false);
  const blogDetailToShow = show ? (
    <BlogData blog={blog} addLike={addLike} />
  ) : (
    ""
  );
  const deleteButtonToShow =
    blog.user.name === user.name ? (
      <DeleteButton handleClick={handleDelete} text="delete" />
    ) : (
      ""
    );

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <ShowButton
        handleClick={() => setShow(!show)}
        text={show ? "hide" : "show"}
      />
      <div>{blogDetailToShow}</div>
      <div>{deleteButtonToShow}</div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
