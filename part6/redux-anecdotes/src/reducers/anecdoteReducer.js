const anecdoteReducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "NEW_ANECDOTE":
      return [...state, action.payload];
    case "ADD_VOTE": {
      const id = action.payload.id;
      const anecdoteToChange = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    }

    default:
      return state;
  }
};

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

export const addVote = (id) => {
  return {
    type: "ADD_VOTE",
    payload: {
      id,
    },
  };
};

export const createAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    payload: {
      content,
      votes: 0,
      id: generateId(),
    },
  };
};

export default anecdoteReducer;
