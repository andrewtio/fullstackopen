const initialState = [
  {
    content: "But it works in my machine...",
    votes: 8,
    id: 1,
  },
  {
    content: "If it hurts, do it more often",
    votes: 2,
    id: 2,
  },
  {
    content:
      "Any fool can write code that a computer can understand, Good programmers write code that humans can understand",
    votes: 1,
    id: 3,
  },
  {
    content:
      "The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code account time.",
    votes: 1,
    id: 4,
  },
  {
    content: "Adding manpower to a late software project makes it later!",
    votes: 0,
    id: 5,
  },
];

const anecdoteReducer = (state = initialState, action) => {
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
      return state
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (anecdote.id !== id ? anecdote : changedAnecdote));
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
