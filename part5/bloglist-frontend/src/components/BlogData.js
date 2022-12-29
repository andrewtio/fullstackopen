const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const BlogData = ({ blog }) => (
  <div>
    <div>Url: {blog.url}</div>
    <div>
      Likes: {blog.likes} <Button text={"like"} />
    </div>
    <div>Author: {blog.author}</div>
  </div>
);

export default BlogData;
