import api from '../../api/api'
import * as types from '../types'

export function fetchCollections(cb) {
    return (dispatch, getState) => {
        api.getCollections(getState().user.accessToken).then(collections => {
            // console.log(collections)
            cb()
            return dispatch({
                type: types.GOT_COLLECTIONS_LIST,
                collections
            })
        })
    }
}

export function fetchUserCollections(cb) {
    return (dispatch, getState) => {
        api.getUserCollections(getState().user.accessToken, 'siddsarkar').then(
            collections => {
                console.log(collections)
                cb()
                return dispatch({
                    type: types.GOT_COLLECTIONS_LIST,
                    collections
                })
            }
        )
    }
}
