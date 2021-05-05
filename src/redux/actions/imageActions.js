import api from '../../services/api';
import * as types from '../types';

export const togglePhotoLike = (options = {image: {}}, cb) => (
  dispatch,
  getState,
) => {
  api
    .toggleImageLike(getState().user.accessToken, {
      image: options.image,
    })
    .then(({json, rate}) => {
      dispatch({type: types.UPDATE_RATE_LIMIT, rate});
      return cb(json.photo);
    });
};
export const toggleCollection = (
  options = {collection_id: null, photo_id: null, inCollection: null},
  cb,
) => (dispatch, getState) => {
  api
    .toggleAddToCollection(getState().user.accessToken, {
      collection_id: options.collection_id,
      photo_id: options.photo_id,
      inCollection: options.inCollection,
    })
    .then(({json, rate}) => {
      dispatch({type: types.UPDATE_RATE_LIMIT, rate});
      return cb({json});
    });
};

export const fetchSearch = (
  options = {query: '', page: 1, search_type: 'photos', per_page: 30},
) => (dispatch, getState) =>
  api
    .getSearchPhotos(getState().user.accessToken, {
      query: options.query,
      page: options.page,
      per_page: options.per_page,
    })
    .then(({json, rate}) =>
      dispatch({
        type:
          options.page === 1
            ? types.GOT_SEARCH_RESULTS
            : types.GOT_MORE_SEARCH_RESULTS,
        data: json,
        search_type: options.search_type,
        query: options.query,
        page: options.page,
        per_page: options.per_page,

        rate,
      }),
    )
    .catch((e) =>
      dispatch({
        type: types.GOT_SEARCH_RESULTS,
        error: e.toString(),
        search_type: options.search_type,
        query: options.query,
        page: options.page,
        per_page: options.per_page,
      }),
    );

export const fetchPhotos = (
  options = {page: 1, order_by: 'latest', per_page: 10},
) => (dispatch, getState) =>
  api
    .getRandomPhotos(getState().user.accessToken, {
      page: options.page,
      per_page: options.per_page,
      order_by: options.order_by,
    })
    .then(({json, rate}) =>
      dispatch({
        type: options.page === 1 ? types.GOT_PHOTOS : types.GOT_MORE_PHOTOS,
        photos: json,
        page: options.page,
        per_page: options.per_page,
        order_by: options.order_by,

        rate,
      }),
    )
    .catch((e) => dispatch({type: types.GOT_PHOTOS_ERROR, error: e}));
