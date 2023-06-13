import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";
import { setAnecdotes } from "./reducers/anecdoteReducer";
import { filterChange } from "./reducers/filterReducer";
import anecdoteService from "./services/anecdotes";

anecdoteService
  .getAll()
  .then((anecdotes) => store.dispatch(setAnecdotes(anecdotes)));

store.subscribe(() => console.log(store.getState()));
store.dispatch(filterChange(""));

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
