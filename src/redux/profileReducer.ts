import { profileAPI } from "../api/profileAPI";
import { stopSubmit } from "redux-form";
import { PostType, ProfileType, PhotosType } from "../types/types";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const SAVE_PROFILE = 'SAVE_PROFILE'; 

let initialState = {
  //* Посты
  posts: [
    {
      id: 1,
      message: "Hi. how are you?",
      likesCount: 1,
    },
    {
      id: 2,
      message: "It's my first post",
      likesCount: 3,
    },
  ] as Array<PostType>,
  newPostText: "",
  profile: null as ProfileType | null,
  status: "",
};
export type InitialStateType = typeof initialState
const profileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_POST: {
      let id = state.posts.length + 1;
      let newPost = {
        id: id,
        message: action.text,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos
        } as ProfileType
      }
    }
    case SAVE_PROFILE: {
      return {
        ...state
      }
    }

    default:
      return state;
  }
};
type AddPostCreatorActionType = {
  type: typeof ADD_POST,
  text: string
}
export let addPostCreator = (text: string): AddPostCreatorActionType => ({ type: ADD_POST, text });
type DeletePostActionType = {
  type: typeof DELETE_POST,
  postId: number
}
export let deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId });
type SetStatusActionType = {
  type: typeof SET_STATUS,
  status: string
}
export let setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status });
type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE,
  profile: ProfileType
}
export let setUserProfile = (profile: any): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });
type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS,
  photos: PhotosType
}
export let savePhotoSuccess = (photos: any): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos});
type SaveProfileSuccessActionType = {
  type: typeof SAVE_PROFILE,
  profile: ProfileType
}
export let saveProfileSuccess = (profile: any) => ({type: SAVE_PROFILE, profile});

export let getStatus = (userId: number) => async (dispatch: any) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};
export let updateStatus = (status: string) => async (dispatch: any) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};
export let getUserProfile = (userId: number) => async (dispatch: any) => {
  let response = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};
export let savePhoto = (photo: any) => async (dispatch: any) => {
  let response = await profileAPI.savePhoto(photo);
  if(response.data.resultCode === 0){
    dispatch(savePhotoSuccess(response.data.data.photos))
  }
};
export let saveProfile = (profile: any) => async (dispatch: any, getState: any) => {
  let userId = getState().auth.userId;
  console.log(profile);
  let response = await profileAPI.saveProfile(profile);
  if(response.data.resultCode === 0){
    dispatch(getUserProfile(userId));
  }
  else{
    let message = response.data.messages.length > 0
      ? response.data.messages
      : 'Some error';
    if(message.length > 1){
      message.forEach((m: any) => {
        m += '\n';
      });
    }
    let action = stopSubmit('profileData', { _error: message });
    dispatch(action);
    return Promise.reject(message);
  }
}

export default profileReducer;
