import { instance, APIResponseType } from './api';

type CaptchaResponseData = {
   url: string
}

export const securityAPI = {
   captcha () {
      return instance.get<CaptchaResponseData>(`security/get-captcha-url`)
      .then(res => res.data);
   },
}