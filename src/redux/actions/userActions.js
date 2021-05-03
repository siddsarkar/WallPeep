import api from '../../services/api';
import AsyncStore from '../../utils/asyncStore';
import * as types from '../types';

export function retrieveUser({accessToken}, cb) {
  return (dispatch, getState) => {
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
    cb();
  };
}

export function fetchUser(cb) {
  return (dispatch, getState) => {
    api.getUserInfo(getState().user.accessToken).then((info) => {
      dispatch({
        type: types.GOT_USER_INFO,
        info,
      });

      cb();
    });
  };
}

export function loginUser(accessToken) {
  return (dispatch, getState) => {
    console.log(accessToken);
    async function setToken() {
      await AsyncStore.setItem('access_token', accessToken);
      dispatch({
        type: types.USER_LOGGED_IN,
        accessToken,
      });
    }

    setToken();
  };
}

export function logoutUser() {
  return (dispatch, getState) => {
    console.log(getState());

    async function removeToken() {
      await AsyncStore.removeItem('access_token');
      dispatch({type: types.USER_LOGGED_OUT});
    }

    removeToken();
  };
}
