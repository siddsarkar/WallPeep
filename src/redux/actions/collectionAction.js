import api from '../../services/api'
import * as types from '../types'

export const fetchPhotoCollection = (id) => (dispatch, getState) =>
    api
        .getCollection(getState().user.accessToken, {id})
        .then(({json, rate}) => {
            dispatch({
                type: types.GOT_A_COLLECTION,
                data: json,

                rate
            })
        })

export const fetchCollections = () => (dispatch, getState) =>
    api.getCollections(getState().user.accessToken).then(({json, rate}) => {
        dispatch({
            type: types.GOT_PUBLIC_COLLECTIONS_LIST,
            collections: json,

            rate
        })
    })

export const fetchUserCollections = () => (dispatch, getState) =>
    api
        .getUserCollections(getState().user.accessToken, {
            username: 'siddsarkar'
        })
        .then(({json, rate}) => {
            dispatch({
                type: types.GOT_USER_COLLECTIONS_LIST,
                userCollections: json,

                rate
            })
        })
