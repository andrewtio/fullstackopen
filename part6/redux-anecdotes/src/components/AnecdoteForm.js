import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const NewAnecdote = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(createAnecdote(content));
    dispatch(setNotification(content));
    setTimeout(() => {
      dispatch(clearNotification(""));
    }, 5000);
  };

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default NewAnecdote;
