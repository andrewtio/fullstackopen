import { connect } from "react-redux";
import Blog from "../components/Blog";
import { useDispatch } from "react-redux";
import {
  setNotificationBlog,
  clearNotificationBlog,
} from "../reducers/notificationReducer";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";

const BlogList = (props) => {
  const dispatch = useDispatch();

  const modifiedBlogs = [...props.blogs];

  const blogsSortedByLikes = modifiedBlogs.sort(function (a, b) {
    return b.likes - a.likes;
  });

  const addLike = (id) => {
    const blog = props.blogs.find((n) => n.id === id);

    dispatch(likeBlog(blog));
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        `Remove blog '${
          props.blogs.find((blog) => blog.id === id).title
        }' by '${props.blogs.find((blog) => blog.id === id).author}'?`
      )
    ) {
      dispatch(deleteBlog(props.user, id));
      dispatch(setNotificationBlog("Blog has been deleted"));
      setTimeout(() => {
        dispatch(clearNotificationBlog());
      }, 5000);
    } else {
      alert("Do nothing");
    }
  };

  return (
    <>
      <h2>Blogs</h2>
      {blogsSortedByLikes.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={() => addLike(blog.id)}
          handleDelete={() => handleDelete(blog.id)}
          user={props.user}
        />
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  };
};

export default connect(mapStateToProps)(BlogList);
