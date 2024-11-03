import {
  LOGIN,
  CREATEACCOUNT,
  APPLOGOUT
} from '../../utils/config';
import {
  apiPost,
  clearUserData,
  setUserData,
  setUserTempData,
} from "../../utils/utils";
import store from "../store";
import types from "../types";

const { dispatch } = store;

export const saveUserData = (data) => {
  dispatch({
    type: types.LOGIN,
    payload: data,
  });
};

export function login(data) {
  return new Promise((resolve, reject) => {
    apiPost(LOGIN, data)
      .then((res) => {
        console.log(res);
        setUserData(res)
          .then(() => {
            saveUserData(res);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function appLogOut(data) {
  return new Promise((resolve, reject) => {
    apiPost(APPLOGOUT, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function signup(data) {
  return new Promise((resolve, reject) => {
    apiPost(CREATEACCOUNT, data)
      .then((res) => {
        setUserTempData(res)
          .then(() => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function logout() {
  return new Promise((resolve, reject) => {
    dispatch({ type: types.CLEAR_REDUX_STATE });
    clearUserData()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

