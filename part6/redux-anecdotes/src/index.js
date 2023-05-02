import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import reducer from "./reducers/anecdoteReducer";

const store = createStore(reducer);

store.dispatch({
  type: "NEW_ANECDOTE",
  payload: {
    content: "But it works in my machine...",
    votes: 8,
    id: 1,
  },
});

store.dispatch({
  type: "NEW_ANECDOTE",
  payload: {
    content: "If it hurts, do it more often",
    votes: 2,
    id: 2,
  },
});

store.dispatch({
  type: "NEW_ANECDOTE",
  payload: {
    content:
      "Any fool can write code that a computer can understand, Good programmers write code that humans can understand",
    votes: 1,
    id: 3,
  },
});

store.dispatch({
  type: "NEW_ANECDOTE",
  payload: {
    content:
      "The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code account time.",
    votes: 1,
    id: 4,
  },
});

store.dispatch({
  type: "NEW_ANECDOTE",
  payload: {
    content: "Adding manpower to a late software project makes it later!",
    votes: 0,
    id: 5,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
