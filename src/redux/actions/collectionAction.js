import api from '../../services/api';
import * as types from '../types';

export const fetchPhotoCollection = (id) => (dispatch, getState) =>
  api.getCollection(getState().user.accessToken, {id}).then((collection) => {
    dispatch({
      type: types.GOT_A_COLLECTION,
      data: collection,
    });
  });

export const fetchCollections = () => (dispatch, getState) =>
  api.getCollections(getState().user.accessToken).then((collections) => {
    dispatch({
      type: types.GOT_PUBLIC_COLLECTIONS_LIST,
      collections,
    });
  });

export const fetchUserCollections = () => (dispatch, getState) =>
  api
    .getUserCollections(getState().user.accessToken, {
      username: 'siddsarkar',
    })
    .then((userCollections) => {
      dispatch({
        type: types.GOT_USER_COLLECTIONS_LIST,
        userCollections,
      });
    });
