import {instance} from './api';

export const profileAPI = {
   getProfile (userId) {
      return instance.get(
         `profile/${userId}`
      ).then(responce => {
         return responce;
      });
   },

   getStatus (userId) {
      return instance.get(`profile/status/${userId}`).then(response => {
         return response;
      });
   },

   updateStatus (status) {
      return instance.put('profile/status', { status: status }).then(response => {
         return response;
      });
   },

   savePhoto (photoFile) {
      const formData = new FormData();
      formData.append('image', photoFile);
      return instance.put('profile/photo', formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      });
   },
   
   saveProfile(profile) {
      return instance.put('profile', profile).then(response => {
         return response;
      });
   }
}