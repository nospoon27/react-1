import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message'
import { updateNewMessageBodyCreater, sendMessageCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';

function DialogsContainer(props) {
  let state = props.store.getState().dialogsPage;
  
  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator());
  }
  let onChangeNewMessage = (body) => {
    props.store.dispatch(updateNewMessageBodyCreater(body))
  }

  return <Dialogs updateNewMessageBody={onChangeNewMessage} 
                  sendMessage={onSendMessageClick}
                  dialogsPage={state} />;
}

export default DialogsContainer;