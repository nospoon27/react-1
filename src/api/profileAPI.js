import {instance} from './api';

export const profileAPI = {
   getProfile (userId) {
      return instance.get(
         `profile/${userId}`
      ).then(responce => {
         return responce.data;
      });
   },

   getStatus (userId) {
      return instance.get(`profile/status/${userId}`).then(response => {
         return response.data;
      });
   },

   updateStatus (status) {
      return instance.put('profile/status', { status: status }).then(response => {
         return response.data;
      });
   }
}