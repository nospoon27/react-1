const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
  ]
};

const dialogsReducer = (state = initialState, action) => {

   switch(action.type){
      case SEND_MESSAGE: {
        let body = action.newMessageBody;
        let messages = state.messages;
        let lastId = messages[messages.length - 1].id;
        return {
          ...state,
          messages: [...state.messages, {
            id: lastId + 1,
            message: body
          }]
        };
      }
      default:
         return state;
   }
}

export let sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody })


export default dialogsReducer;