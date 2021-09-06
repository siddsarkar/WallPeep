import * as types from '../types'

const initState = {
  rate: {},
  rateShown: false,
}

const reducer = (state = initState, action) => {
  const {rate, type} = action

  if (rate || type === types.UPDATE_RATE_LIMIT) {
    return {
      ...state,
      rate,
    }
  }
  if (type === types.TOGGLE_SHOW_RATE) {
    return {
      ...state,
      rateShown: !state.rateShown,
    }
  }

  return state
}

export default reducer
