import { profileAPI } from "../api/profileAPI";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
   //* Посты
   posts: [{
      id: 1,
      message: "Hi. how are you?"
    },
    {
      id: 2,
      message: "It's my first post"
    },
  ],
  newPostText: '',
  profile: null,
  status: ''
};

const profileReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_POST: {
         let id = state.posts.length + 1;
         let newPost = {
            id: id,
            message: action.text
         };
         return {
            ...state,
            posts: [...state.posts, newPost],
            newPostText: ''
         };
      }
      case SET_USER_PROFILE: {
         return {
            ...state,
            profile: action.profile
         }
      }
      case SET_STATUS: {
         return {
            ...state,
            status: action.status
         }
      }

      default:
         return state;
   }
}

export let addPostCreator = (text) => ({ type: ADD_POST, text })
export let setStatus = (status) => ({type: SET_STATUS, status})
export let setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export let getStatus = (userId) => (dispatch) => {
   profileAPI.getStatus(userId).then((data) => {
      dispatch(setStatus(data));
   });
}
export let updateStatus = (status) => (dispatch) => {
   profileAPI.updateStatus(status).then((data) => {
      if(data.resultCode === 0){
         dispatch(setStatus(status));
      }
   });
}
export let getUserProfile = (userId) => (dispatch) => {
   profileAPI.getProfile(userId).then((data) => {
      dispatch(setUserProfile(data));
    });

}


export default profileReducer;