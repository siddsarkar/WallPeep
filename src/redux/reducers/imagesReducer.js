import * as types from '../types';

const initialState = {
  photos: [],
  error: [],
  page: 1,
  per_page: 10,
  order_by: 'latest',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GOT_PHOTOS:
      return {
        ...state,
        photos: action.photos,
        page: action.page,
        per_page: action.per_page,
        order_by: action.order_by,
      };
    case types.GOT_MORE_PHOTOS:
      return {
        ...state,
        photos: [...state.photos, ...action.photos],
        page: action.page,
        per_page: action.per_page,
        order_by: action.order_by,
      };
    case types.GOT_PHOTOS_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
