import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  );
};

const Anecdotes = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    let res = anecdotes;
    if (filter) {
      res = anecdotes.filter((anecdote) => anecdote.content.includes(filter));
    }
    return res;
  });

  return (
    <>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => dispatch(addVote(anecdote.id))}
          />
        ))}
      </ul>
    </>
  );
};

export default Anecdotes;
