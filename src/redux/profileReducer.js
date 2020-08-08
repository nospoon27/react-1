import { profileAPI } from "../api/profileAPI";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

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
  ],
  newPostText: "",
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
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
        }
      }
    }

    default:
      return state;
  }
};

export let addPostCreator = (text) => ({ type: ADD_POST, text });
export let deletePost = (postId) => ({ type: DELETE_POST, postId });
export let setStatus = (status) => ({ type: SET_STATUS, status });
export let setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export let savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});
export let getStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};
export let updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};
export let getUserProfile = (userId) => async (dispatch) => {
  let response = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};
export let savePhoto = (photo) => async (dispatch) => {
  let response = await profileAPI.savePhoto(photo);
  if(response.data.data.resultCode === 0){
    dispatch(savePhotoSuccess(response.data.photos))
  }
};

export default profileReducer;
