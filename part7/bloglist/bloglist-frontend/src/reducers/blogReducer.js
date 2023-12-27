import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import {
  setNotificationBlog,
  clearNotificationBlog,
} from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    addLike(state, action) {
      const id = action.payload;
      state.find((n) => n.id === id).likes += 1;
    },
  },
});

export const { addBlog, setBlogs, removeBlog, addLike } = blogSlice.actions;

export const initializeBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (user, content) => {
  return async (dispatch) => {
    try {
      blogService.setToken(user.token);
      const newBlog = await blogService.create(content);
      dispatch(addBlog(newBlog));
      dispatch(
        setNotificationBlog(
          `A new blog: ${newBlog.title} by ${newBlog.author} is added`
        )
      );
      setTimeout(() => {
        dispatch(clearNotificationBlog());
      }, 5000);
    } catch (exception) {
      console.log("Blog Validation Failed:", exception);
      dispatch(setNotificationBlog(`${exception.response.data.error}`));
    }
  };
};

export const deleteBlog = (user, id) => {
  return async (dispatch) => {
    try {
      blogService.setToken(user.token);
      await blogService.deleteBlog(id);
      dispatch(removeBlog(id));
      dispatch(setNotificationBlog("The blog was successfully deleted!"));
    } catch (exception) {
      console.log(exception);
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const changedBlog = { blog, likes: blog.likes + 1 };
    const updatedBlog = await blogService.update(blog.id, changedBlog);
    dispatch(addLike(updatedBlog.id));
    dispatch(
      setNotificationBlog(
        `1 like on blog ${updatedBlog.title} by ${updatedBlog.author} has been added`
      )
    );
    setTimeout(() => {
      dispatch(clearNotificationBlog());
    }, 5000);
  };
};

export default blogSlice.reducer;
