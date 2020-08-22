import { authAPI } from "../api/authAPI";
import { securityAPI } from "../api/securityAPI";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL";

// type InitialStateType = {
//   userId: number | null;
//   email: string | null;
//   login: string | null;
//   isAuth: boolean;
//   captchaUrl: string | null;
// };

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};
export type InitialStateType = typeof initialState;
const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case SET_CAPTCHA_URL:
      return {
        ...state,
        ...action.payload
      };
    default:
      return { ...state };
  }
};

type SetAuthUserDataActionPayloadType = {
  userId: number;
  email: string;
  login: string;
  isAuth: boolean;
};

type SetAuthUserDataType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataActionPayloadType;
};

export const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
) => ({
  type: SET_USER_DATA,
  payload: {
    userId,
    email,
    login,
    isAuth,
  },
});
type SetCaptchaUrlType = {
  type: typeof SET_CAPTCHA_URL;
  payload: {
    captchaUrl: string;
  };
};
export const setCaptchaUrl = (captchaUrl: string) => ({
  type: SET_CAPTCHA_URL,
  payload: {
    captchaUrl,
  },
});

export const getCaptchaUrl = () => async (dispatch: any) => {
  let response = await securityAPI.captcha();
  const captchaUrl = response.data.url;
  dispatch(setCaptchaUrl(captchaUrl));
};
export const getAuthUserData = () => async (dispatch: any) => {
  let response = await authAPI.me();
  let { id, email, login } = response.data.data;
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(id, login, email, true));
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
) => async (dispatch: any) => {
  let response = await authAPI.login(email, password, rememberMe);
  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    let message =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : "Some error";
    let action = stopSubmit("login", { _error: message });
    dispatch(action);
  }
};
export const logout = () => async (dispatch: any) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
