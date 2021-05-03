import api from '../../services/api';
import * as types from '../types';

export function fetchCollections(cb) {
  return (dispatch, getState) => {
    api.getCollections(getState().user.accessToken).then((collections) => {
      dispatch({
        type: types.GOT_PUBLIC_COLLECTIONS_LIST,
        collections,
      });
      cb();
    });
  };
}

export function fetchUserCollections(cb) {
  return (dispatch, getState) => {
    api
      .getUserCollections(getState().user.accessToken, {
        username: 'siddsarkar',
      })
      .then((userCollections) => {
        dispatch({
          type: types.GOT_USER_COLLECTIONS_LIST,
          userCollections,
        });
        cb();
      });
  };
}
