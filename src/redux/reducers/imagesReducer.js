import * as types from '../types'

const initialState = {
    photos: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GOT_COLLECTIONS_LIST:
            return {
                ...state,
                collections: action.collections
            }
        default:
            return state
    }
}

export default reducer
