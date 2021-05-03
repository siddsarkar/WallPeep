import {combineReducers} from 'redux';
import collectionsReducer from './collectionsReducer';
import imagesReducer from './imagesReducer';
import searchReducer from './searchReducer';
import userReducer from './userReducer';

export default combineReducers({
  user: userReducer,
  images: imagesReducer,
  collections: collectionsReducer,
  search: searchReducer,
});
