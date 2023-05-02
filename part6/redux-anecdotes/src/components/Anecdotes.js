import { useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li onClick={handleClick}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => addVote(anecdote.id)}>vote</button>
      </div>
    </li>
  );
};

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state);

  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatchEvent(addVote(anecdote.id))}
        />
      ))}
    </ul>
  );
};

export default Anecdotes;
