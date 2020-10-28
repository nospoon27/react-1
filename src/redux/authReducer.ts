import { BaseThunkType, InferActionTypes } from './reduxStore';
import { authAPI } from "../api/authAPI";
import { securityAPI } from "../api/securityAPI";
import { FormAction, stopSubmit } from "redux-form";

let initialState = {
  userId: null as (number | null),
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case 'auth/SET_USER_DATA':
    case 'auth/SET_CAPTCHA_URL':
      return {
        ...state,
        ...action.payload
      };
    default:
      return { ...state };
  }
};

//-------actions--------------
type ActionTypes = InferActionTypes<typeof actions>;

export const actions = {
   setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
      type: 'auth/SET_USER_DATA',
      payload: { userId, email, login, isAuth },
   }) as const,
   setCaptchaUrl: (captchaUrl: string) => ({ type: 'auth/SET_CAPTCHA_URL', payload: { captchaUrl } }) as const,
} 

//-------thunks--------------

type ThunkType = BaseThunkType<ActionTypes | FormAction>

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  let data = await securityAPI.captcha();
  dispatch(actions.setCaptchaUrl(data.url));
};
export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let response = await authAPI.me();
  let { id, email, login } = response.data.data;
  if (response.data.resultCode === 0) {
    dispatch(actions.setAuthUserData(id, login, email, true));
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
): ThunkType => async (dispatch) => {
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
export const logout = ():ThunkType => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
