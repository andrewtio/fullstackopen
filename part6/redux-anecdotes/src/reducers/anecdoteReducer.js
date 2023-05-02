const anecdoteReducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "NEW_ANECDOTE":
      return [...state, action.payload];
    case "ADD_VOTE": {
      return [...state, action.payload];
    }
    default:
      return state;
  }
};

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

export const addVote = (votes) => {
  return {
    type: "ADD_VOTE",
    payload: {
      votes: votes + 1,
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
