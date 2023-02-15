import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

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
            value={newTitle}
            placeholder="write title here"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author:{" "}
          <input
            value={newAuthor}
            placeholder="write author here"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url:{" "}
          <input
            value={newUrl}
            placeholder="write url here"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
