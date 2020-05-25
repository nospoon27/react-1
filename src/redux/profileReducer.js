import { profileAPI } from "../api/profileAPI";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

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
  newPostText: ''
};

const profileReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_POST: {
         let id = state.posts.length + 1;
         let newPost = {
            id: id,
            message: state.newPostText
         };
         return {
            ...state,
            posts: [...state.posts, newPost],
            newPostText: ''
         };
      }
      case UPDATE_NEW_POST_TEXT: {
         return {
            ...state,
            newPostText: action.text
         };
      }
      case SET_USER_PROFILE: {
         return {
            ...state,
            profile: action.profile
         }
      }

      default:
         return state;
   }
}

export let addPostCreator = () => ({ type: ADD_POST })
export let updateNewPostCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, text: text })
export let setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export let getUserProfile = (userId) => (dispatch) => {
   profileAPI.getProfile(userId).then((data) => {
      dispatch(setUserProfile(data));
    });
}


export default profileReducer;