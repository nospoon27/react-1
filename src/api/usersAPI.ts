import { UserType } from '../types/types';
import { instance, GetItemsType } from './api';

export const usersAPI = {
   getUsers (currentPage = 1, pageSize = 10) {
      return instance.get<GetItemsType<UserType>>(
         `users?page=${currentPage}&count=${pageSize}`
      ).then(responce => {
         return responce.data;
      });
   },

   follow(userId: number) {
      return instance.post(   
         `follow/${userId}`
      ).then(responce => {
         return responce.data;
      });
   },

   unfollow(userId: number) {
      return instance.delete(
         `follow/${userId}`
      ).then(responce => {
         return responce.data;
      });
   }
}