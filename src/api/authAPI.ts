import { instance, APIResponseType, ResultCode, ResultCodeWithCaptha } from './api';

type MeData = {
   id: number
   email: string
   login: string
}

type LoginData = {
   userId: number
}


export const authAPI = {
   me () {
      return instance.get<APIResponseType<MeData>>(`auth/me`);
   },
   login (email: string, password: string, rememberMe = false) {
      return instance.post<APIResponseType<LoginData, ResultCode & ResultCodeWithCaptha>>(`auth/login`, {
         email,
         password,
         rememberMe
      });
   },
   logout (){
      return instance.delete<APIResponseType>(`auth/login`);
   }
}