import { BaseThunkType, InferActionTypes } from './reduxStore'
import { profileAPI } from '../api/profileAPI'
import { FormAction, stopSubmit } from 'redux-form'
import { PostType, ProfileType, PhotosType } from '../types/types'

let initialState = {
   //* Посты
   posts: [
      {
         id: 1,
         message: 'Hi. how are you?',
         likesCount: 1,
      },
      {
         id: 2,
         message: "It's my first post",
         likesCount: 3,
      },
   ] as Array<PostType>,
   newPostText: '',
   profile: null as ProfileType | null,
   status: '',
}
export type InitialStateType = typeof initialState
const profileReducer = (state = initialState, action: ActionTypes) => {
   switch (action.type) {
      case 'profile/ADD_POST': {
         let id = state.posts.length + 1
         let newPost = {
            id: id,
            message: action.text,
         }
         return {
            ...state,
            posts: [...state.posts, newPost],
            newPostText: '',
         }
      }
      case 'profile/DELETE_POST': {
         return {
            ...state,
            posts: state.posts.filter((p) => p.id !== action.postId),
         }
      }
      case 'profile/SET_USER_PROFILE': {
         return {
            ...state,
            profile: action.profile,
         }
      }
      case 'profile/SET_STATUS': {
         return {
            ...state,
            status: action.status,
         }
      }
      case 'profile/SAVE_PHOTO_SUCCESS': {
         return {
            ...state,
            profile: {
               ...state.profile,
               photos: action.photos,
            } as ProfileType,
         }
      }
      case 'profile/SAVE_PROFILE': {
         return {
            ...state,
         }
      }

      default:
         return state
   }
}

//-----actions-----
type ActionTypes = InferActionTypes<typeof actions>
export const actions = {
   addPostCreator: (text: string) => ({ type: 'profile/ADD_POST', text } as const),
   deletePost: (postId: number) => ({ type: 'profile/DELETE_POST', postId } as const),
   setStatus: (status: string) => ({ type: 'profile/SET_STATUS', status } as const),
   setUserProfile: (profile: ProfileType) => ({ type: 'profile/SET_USER_PROFILE', profile } as const),
   savePhotoSuccess: (photos: PhotosType) => ({ type: 'profile/SAVE_PHOTO_SUCCESS', photos } as const),
   saveProfileSuccess: (profile: ProfileType) => ({ type: 'profile/SAVE_PROFILE', profile } as const),
}

//---thunks---
type ThunkType = BaseThunkType<ActionTypes | FormAction>

export let getStatus = (userId: number): ThunkType => async (dispatch) => {
   let data = await profileAPI.getStatus(userId)
   dispatch(actions.setStatus(data))
}
export let updateStatus = (status: string): ThunkType => async (dispatch) => {
   let data = await profileAPI.updateStatus(status)
   if (data.resultCode === 0) {
      dispatch(actions.setStatus(status))
   }
}

export let getUserProfile = (userId: number): ThunkType => async (dispatch) => {
   let data = await profileAPI.getProfile(userId)
   dispatch(actions.setUserProfile(data.data))
}

export let savePhoto = (photo: File): ThunkType => async (dispatch) => {
   let data = await profileAPI.savePhoto(photo)
   if (data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(data.data.photos))
   }
}

export let saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
   let userId = getState().auth.userId
   console.log(profile)
   let response = await profileAPI.saveProfile(profile)
   if (response.data.resultCode === 0) {
      if (userId != null) dispatch(getUserProfile(userId))
      else throw new Error("userId can't be null")
   } else {
      let message = response.data.messages.length > 0 ? response.data.messages : 'Some error'
      if (message.length > 1) {
         message.forEach((m: any) => {
            m += '\n'
         })
      }
      let action = stopSubmit('profileData', { _error: message })
      dispatch(action)
      return Promise.reject(message)
   }
}

export default profileReducer
