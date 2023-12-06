import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearNotificationBlog,
  setNotificationBlog,
} from "../reducers/notificationReducer";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const dispatch = useDispatch();

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });
    dispatch(
      setNotificationBlog(
        `A new blog ${newTitle} by ${newAuthor} has been added`
      )
    );
    setTimeout(() => {
      dispatch(clearNotificationBlog());
    }, 5000);
    setNewAuthor("");
    setNewTitle("");
    setNewUrl("");
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:{" "}
          <input
            id="title"
            value={newTitle}
            placeholder="write title here"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author:{" "}
          <input
            id="author"
            value={newAuthor}
            placeholder="write author here"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url:{" "}
          <input
            id="url"
            value={newUrl}
            placeholder="write url here"
            onChange={handleUrlChange}
          />
        </div>
        <button id="submit-button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
