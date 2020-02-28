const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

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
    }
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
    if (action.type === ADD_POST) {
      let id = this._state.profilePage.posts.length + 1;
      let newPost = {
        id: id,
        message: this._state.profilePage.newPostText
      };
      //* Очистить текст после добавления
      this._state.profilePage.newPostText = '';
      this._state.profilePage.posts.push(newPost);
      this._callSubscriber(this._state);
    }
    else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.text;
      this._callSubscriber(this._state);
    }
    else if(action.type === UPDATE_NEW_MESSAGE_BODY) {
      this._state.messagePage.newMessageBody = action.text;
      this._callSubscriber(this._state);
    }
    else if (action.type === SEND_MESSAGE) {
      let body = this._state.messagePage.newMessageBody
      let messages = this._state.messagePage.messages;
      let lastId = messages[messages.length].id;
      this._state.messagePage.messages.push({ id: lastId + 1, message: body });
      this._callSubscriber(this._state);
    }
  }
}

export let addPostCreator =() => ({ type: ADD_POST })

export let updateNewPostCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, text: text })

export let updateNewMessageBodyCreater = (text) => ({ type: UPDATE_NEW_MESSAGE_BODY, text: text })
export let sendMessageCreator = () => ({ type: SEND_MESSAGE })

export default store;
window.store = store;