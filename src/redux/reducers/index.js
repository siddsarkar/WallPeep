import {combineReducers} from 'redux'
import collectionsReducer from './collectionsReducer'
import userReducer from './userReducer'

export default combineReducers({
    user: userReducer,
    collections: collectionsReducer
})
