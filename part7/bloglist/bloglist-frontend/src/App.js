import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import ErrorMessage from "./components/ErrorMessage";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import Notification from "./components/Notification";
import "./index.css";
import {
  setNotificationBlog,
  clearNotificationBlog,
} from "./reducers/notificationReducer";
import { initializeBlog } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import { loginUserLocalStorage } from "./reducers/loginReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginUserLocalStorage());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(initializeBlog());
    }
  }, [user]);

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
      dispatch(setNotificationBlog("Cannot logout"));
      setTimeout(() => {
        dispatch(clearNotificationBlog());
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
      <Notification />
      <p>
        {user.name} logged-in <LogoutForm handleLogout={handleLogout} />
      </p>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm user={user} />
      </Togglable>
      <BlogList user={user} />
    </div>
  );
};

export default App;
