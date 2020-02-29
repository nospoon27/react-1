const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

const dialogsReducer = (state, action) => {

   switch(action.type){
      case UPDATE_NEW_MESSAGE_BODY:
         state.newMessageBody = action.text;
         return state;
      case SEND_MESSAGE:
         let body = state.newMessageBody;
         let messages = state.messages;
         let lastId = messages[messages.length - 1].id;
         state.messages.push({ id: lastId + 1, message: body });
         state.newMessageBody = '';
         return state;
      default:
         return state;
   }
}

export let updateNewMessageBodyCreater = (text) => ({ type: UPDATE_NEW_MESSAGE_BODY, text: text })
export let sendMessageCreator = () => ({ type: SEND_MESSAGE })


export default dialogsReducer;