import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const middlewares = [thunk]

if (process.env.NODE_ENV === `development`) {
  const {createLogger} = require(`redux-logger`)
  const logger = createLogger({
    collapsed: true,
  })

  middlewares.push(logger)
}

const store = createStore(reducers, applyMiddleware(...middlewares))

export default store
