import {instance} from './api';

export const authAPI = {
   captcha () {
      return instance.get(`security/get-captcha-url`);
   },
}