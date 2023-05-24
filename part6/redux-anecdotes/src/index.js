import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";
import { createAnecdote } from "./reducers/anecdoteReducer";
import { filterChange } from "./reducers/filterReducer";

store.subscribe(() => console.log(store.getState()));
store.dispatch(filterChange(""));
store.dispatch(createAnecdote("Hello Anecdotes"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
