import {instance} from './api';

export const authAPI = {
   // getProfile (userId) {
   //    return instance.get(
   //       `profile/${userId}`
   //    ).then(responce => {
   //       return responce.data;
   //    });
   // },
   me () {
      return instance.get(`auth/me`);
   }
}