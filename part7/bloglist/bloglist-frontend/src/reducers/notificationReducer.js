import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      console.log("state", JSON.parse(JSON.stringify(state)));
      console.log("action", action);
      const content = action.payload;
      return state.replace(initialState, content);
    },
    clearNotification() {
      return "";
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const setNotificationBlog = (message) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
  };
};

export const clearNotificationBlog = () => {
  return async (dispatch) => {
    dispatch(clearNotification());
  };
};

export default notificationSlice.reducer;
