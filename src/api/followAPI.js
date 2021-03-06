import {instance} from './api';

export const followAPI = {
   unfollow (userId) {
      return instance.delete(
         `follow/${userId}`
      ).then(responce => {
         return responce.data;
      });
   },

   follow (userId) {
      return instance.post(
         `follow/${userId}`
      ).then(responce => {
         return responce.data;
      });
   }
}