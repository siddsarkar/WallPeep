import * as types from '../types';

const initialState = {
  collections: [],
  userCollections: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GOT_USER_COLLECTIONS_LIST:
      return {
        ...state,
        userCollections: action.userCollections,
      };
    case types.GOT_PUBLIC_COLLECTIONS_LIST:
      return {
        ...state,
        collections: action.collections,
      };
    default:
      return state;
  }
};

export default reducer;
