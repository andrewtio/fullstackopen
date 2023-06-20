import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  clearNotificationAnecdote,
  setNotificationAnecdote,
} from "../reducers/notificationReducer";

const NewAnecdote = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(createAnecdote(content));
    dispatch(setNotificationAnecdote(`You created '${content}'`), 5);
    setTimeout(() => {
      dispatch(clearNotificationAnecdote());
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
