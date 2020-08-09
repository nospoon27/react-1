import { authAPI } from "../api/authAPI";
import { securityAPI } from './../api/securityAPI';
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case SET_CAPTCHA_URL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return { ...state };
  }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: {
    userId,
    email,
    login,
    isAuth,
  },
});
export const setCaptchaUrl = (captchaUrl) => ({
  type: SET_CAPTCHA_URL,
  payload: {
    captchaUrl
  },
});
export const getAuthUserData = () => async (dispatch) => {
  let response = await authAPI.me();
  let { id, email, login } = response.data.data;
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(id, login, email, true));
  }
};
export const login = (email, password, rememberMe) => async (dispatch) => {
  let response = await authAPI.login(email, password, rememberMe);
  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    if(response.data.resultCode === 10){
      dispatch(getCaptchaUrl())
    }
    let message =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : "Some error";
    let action = stopSubmit("login", { _error: message });
    dispatch(action);
  }
};
export const logout = () => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
export const getCaptchaUrl = () => async (dispatch) => {
  let response = await securityAPI.captcha();
  const captchaUrl = response.data.url;
  dispatch(setCaptchaUrl(captchaUrl));
};
export default authReducer;
