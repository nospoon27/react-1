let state = {
  profilePage:{
    posts: [
      {id: 1, message: "Hi. how are you?"},
      {id: 2, message: "It's my first post"},
    ],
    
  },
  messagePage:{
    dialogs: [
      {id: 1, name: 'Дим1'},
      {id: 2, name: 'Дим2'},
      {id: 3, name: 'Дим3'},
      {id: 4, name: 'Дим4'},
      {id: 5, name: 'Дим5'},
    ],
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

export let addPost = (postMessage) => {
  let id = state.profilePage.posts.length + 1;
  let newPost = {
    id: id,
    message: postMessage 
  };
  state.profilePage.posts.push(newPost);
};

export default state;