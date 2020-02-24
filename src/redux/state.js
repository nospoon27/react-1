
let store = {
  _state: {
    profilePage:{
      //* Посты
      posts: [
        {id: 1, message: "Hi. how are you?"},
        {id: 2, message: "It's my first post"},
      ],
      newPostText: 'Dim-Kamasutra.com'
    },
    messagePage:{
      //* Диалоги
      dialogs: [
        {id: 1, name: 'Дим1'},
        {id: 2, name: 'Дим2'},
        {id: 3, name: 'Дим3'},
        {id: 4, name: 'Дим4'},
        {id: 5, name: 'Дим5'},
      ],
      //* Сообщения
      messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'Bye'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Get cash'},
        {id: 6, message: 'Welcome'},
      ]
    }
  },
  getState() {
    return this._state;
  },
  _callSubscriber() {
    console.log('asd');
  },
  addPost() {
    let id = this._state.profilePage.posts.length + 1;
    let newPost = {
      id: id,
      message: this._state.profilePage.newPostText 
    };
    //* Очистить текст после добавления
    this._state.profilePage.newPostText = '';
    this._state.profilePage.posts.push(newPost);
    this._callSubscriber(this._state);
  },
  updateNewPostText (newText) {
    this._state.profilePage.newPostText = newText;
    this._callSubscriber(this._state);
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  }
}

export default store;
window.store = store;