import {combineReducers} from 'redux'
import collectionsReducer from './collectionsReducer'
import errorReducer from './errorReducer'
import imagesReducer from './imagesReducer'
import rateReducer from './rateReducer'
import searchReducer from './searchReducer'
import userReducer from './userReducer'

export default combineReducers({
  user: userReducer,
  images: imagesReducer,
  collections: collectionsReducer,
  search: searchReducer,
  rate: rateReducer,
  error: errorReducer,
})
