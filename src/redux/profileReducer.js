const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

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
}

export let addPostCreator = () => ({ type: ADD_POST })
export let updateNewPostCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, text: text })


export default profileReducer;