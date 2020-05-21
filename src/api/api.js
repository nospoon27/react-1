import axios from "axios";

export const instance = axios.create({
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   headers: {
      'API-KEY': '63934751-9384-4304-b68f-a7ea7b5c0b05'
   }
});