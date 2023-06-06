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
    clearNotification(state, action) {
      const content = action.payload;
      return state.replace(initialState, content);
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
