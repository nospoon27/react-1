const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const profileReducer = (state, action) => {

   switch (action.type) {
      case ADD_POST:
         let id = state.posts.length + 1;
         let newPost = {
            id: id,
            message: state.newPostText
         };
         //* Очистить текст после добавления
         state.newPostText = '';
         state.posts.push(newPost);
         return state;
      case UPDATE_NEW_POST_TEXT:
         state.newPostText = action.text;
         return state;
      default:
         return state;
   }

   return state;
}

export let addPostCreator =() => ({ type: ADD_POST })
export let updateNewPostCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, text: text })


export default profileReducer;