import { ProfileType, PhotosType } from './../types/types'
import { instance, APIResponseType, ResultCode } from './api'

export type SavePhotoData = {
   photos: PhotosType
}

export const profileAPI = {
   getProfile(userId: number) {
      return instance.get<APIResponseType<ProfileType>>(`profile/${userId}`)
      .then((responce) => responce.data)
   },

   getStatus(userId: number) {
      return instance.get<string>(`profile/status/${userId}`)
      .then((response) => response.data)
   },

   updateStatus(status: string) {
      return instance
         .put<APIResponseType>('profile/status', { status: status })
         .then((response) => response.data)
   },

   savePhoto(photoFile: File) {
      const formData = new FormData()
      formData.append('image', photoFile)
      return instance
         .put<APIResponseType<SavePhotoData, ResultCode>>('profile/photo', formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         })
         .then((res) => res.data)
   },

   saveProfile(profile: ProfileType) {
      return instance.put('profile', profile).then((response) => response.data)
   },
}
