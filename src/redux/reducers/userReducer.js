import AsyncStore from '../../utils/AsyncStore'
import * as types from '../types'

const retrieveToken = async () => {
    const asToken = await AsyncStore.getItem('access_token', null)
    console.log(asToken)
    if (asToken === null) return false
    return asToken
}

const initialState = {
    isLoggedIn: retrieveToken() === false ? false : true,
    accessToken: retrieveToken(),
    info: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
