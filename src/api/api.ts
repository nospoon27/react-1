import axios from "axios";

export const instance = axios.create({
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   headers: {
      'API-KEY': '043a247b-97f2-4eb8-a6fa-6c535e00a451'
   }
});

export type GetItemsType<T> = {
   items: Array<T>
   totalCount: number,
   error: string | null
}

export enum ResultCode {
   ERROR = 0,
   SUCCESS = 1,
}

export enum ResultCodeWithCaptha {
   CAPTCHA_IS_REQUIRED = 10
}

export type APIResponseType<T = {}, RC = ResultCode> = {
   data: T
   messages: Array<string>,
   resultCode: RC
}