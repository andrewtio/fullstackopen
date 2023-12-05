import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import ErrorMessage from "./components/ErrorMessage";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogsSortedByLikes = blogs.sort(function (a, b) {
    return b.likes - a.likes;
  });

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setMessage(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} has been added`
      );
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  const addLike = (id) => {
    blogFormRef.current.toggleVisibility();
    console.log("id", id);
    const blog = blogs.find((n) => n.id === id);
    console.log("blog", blog);
    const changedBlog = { blog, likes: blog.likes + 1 };
    console.log("changedBlog", changedBlog);

    blogService.update(id, changedBlog).then((returnedBlog) => {
      console.log("returnedBlog", returnedBlog);
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
      setMessage(
        `1 like on blog ${returnedBlog.title} by ${returnedBlog.author} has been added`
      );
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      window.location.reload();
    });
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        `Remove blog '${blogs.find((blog) => blog.id === id).title}' by '${
          blogs.find((blog) => blog.id === id).author
        }'?`
      )
    ) {
      blogService.deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      setMessage("Blog has been deleted");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } else {
      alert("Do nothing");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    console.log("Logging in with", username, password);
  };

  const handleLogout = async () => {
    try {
      window.localStorage.clear();
      window.location.reload();
    } catch (exception) {
      setMessage("Cannot Logout");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <ErrorMessage message={errorMessage} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>
        {user.name} logged-in <LogoutForm handleLogout={handleLogout} />
      </p>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogsSortedByLikes.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={() => addLike(blog.id)}
          handleDelete={() => handleDelete(blog.id)}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
