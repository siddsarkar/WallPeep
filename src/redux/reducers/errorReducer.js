// errorReducer.js

const initState = {
  error: null,
};

export default function reducer(state = initState, action) {
  const {error} = action;

  if (error) {
    return {
      error,
    };
  }

  return state;
}
