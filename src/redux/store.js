import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";

let store = {
  _state: {
    profilePage: {
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
      newPostText: 'Dim-Kamasutra.com'
    },
    messagePage: {
      //* Диалоги
      dialogs: [{
          id: 1,
          name: 'Дим1'
        },
        {
          id: 2,
          name: 'Дим2'
        },
        {
          id: 3,
          name: 'Дим3'
        },
        {
          id: 4,
          name: 'Дим4'
        },
        {
          id: 5,
          name: 'Дим5'
        },
      ],
      //* Сообщения
      messages: [{
          id: 1,
          message: 'Hi'
        },
        {
          id: 2,
          message: 'Hello'
        },
        {
          id: 3,
          message: 'Bye'
        },
        {
          id: 4,
          message: 'Yo'
        },
        {
          id: 5,
          message: 'Get cash'
        },
        {
          id: 6,
          message: 'Welcome'
        },
      ],
      newMessageBody: '',
    },
    sidebar: {}
  },
  getState() {
    return this._state;
  },
  _callSubscriber() {
    console.log('asd');
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagePage = dialogsReducer(this._state.messagePage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
  }
}

export default store;
window.store = store;