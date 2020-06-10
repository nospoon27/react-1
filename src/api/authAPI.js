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
   },
   login (email, password, rememberMe = false) {
      return instance.post(`auth/login`, {
         email,
         password,
         rememberMe
      });
   },
   logout (){
      return instance.delete(`auth/login`);
   }
}