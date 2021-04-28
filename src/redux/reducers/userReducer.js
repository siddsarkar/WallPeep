import * as types from '../types'

const initialState = {
    isLoggedIn: false,
    accessToken: null,
    info: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_RETRIEVED:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                accessToken: action.accessToken
            }
        case types.USER_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: true,
                accessToken: action.accessToken
            }
        case types.USER_LOGGED_OUT:
            return {
                ...state,
                isLoggedIn: false,
                accessToken: null
            }
        case types.GOT_USER_INFO:
            return {
                ...state,
                info: action.info
            }
        default:
            return state
    }
}

export default reducer
