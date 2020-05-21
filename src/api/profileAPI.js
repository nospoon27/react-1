import {instance} from './api';

export const profileAPI = {
   getProfile (userId) {
      return instance.get(
         `profile/${userId}`
      ).then(responce => {
         return responce.data;
      });
   }
}