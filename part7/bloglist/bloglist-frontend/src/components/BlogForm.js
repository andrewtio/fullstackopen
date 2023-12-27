import { useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = (props) => {
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
    const content = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    dispatch(createBlog(props.user, content));
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

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  };
};

export default connect(mapStateToProps)(BlogForm);
