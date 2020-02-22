
export let renderEntireTree = () => {
  console.log('asd');
}

let state = {
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
};

window.state = state;

//* Добавление поста
export const addPost = () => {
  let id = state.profilePage.posts.length + 1;
  let newPost = {
    id: id,
    message: state.profilePage.newPostText 
  };
  //* Очистить текст после добавления
  state.profilePage.newPostText = '';
  state.profilePage.posts.push(newPost);
  renderEntireTree();
};

//* Обновление текста в <textarea />
export const updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText;
  renderEntireTree();
}

export const subscribe = (observer) => {
  renderEntireTree = observer;
}

export default state;