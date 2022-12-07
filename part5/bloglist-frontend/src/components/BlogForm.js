const BlogForm = ({
  onSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  valueTitle,
  valueAuthor,
  valueNewUrl,
}) => {
  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          Title: <input value={valueTitle} onChange={handleTitleChange} />
        </div>
        <div>
          Author: <input value={valueAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          Url: <input value={valueNewUrl} onChange={handleUrlChange} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
