import api from '../../services/api';
import AsyncStore from '../../utils/asyncStore';
import * as types from '../types';

export const retrieveUser = ({accessToken}) => (dispatch, getState) => {
  if (accessToken) {
    dispatch({
      type: types.USER_RETRIEVED,
      isLoggedIn: true,
      accessToken,
    });
  } else {
    dispatch({
      type: types.USER_RETRIEVED,
      isLoggedIn: false,
    });
  }
};

export const fetchUser = () => (dispatch, getState) =>
  api.getUserInfo(getState().user.accessToken).then((info) => {
    dispatch({
      type: types.GOT_USER_INFO,
      info,
    });
  });

export const loginUser = (accessToken) => (dispatch, getState) => {
  AsyncStore.setItem('access_token', accessToken).then(() => {
    dispatch({
      type: types.USER_LOGGED_IN,
      accessToken,
    });
  });
};

export const logoutUser = () => (dispatch, getState) => {
  AsyncStore.removeItem('access_token').then(() => {
    dispatch({type: types.USER_LOGGED_OUT});
  });
};
