import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {
  updateNewMessageBodyCreater,
  sendMessageCreator
} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

function DialogsContainer(props) {
  return (
    <StoreContext.Consumer>
      {store => {
        let state = store.getState();
        
        let onSendMessageClick = () => {
          store.dispatch(sendMessageCreator());
        };
        let onChangeNewMessage = body => {
          store.dispatch(updateNewMessageBodyCreater(body));
        };

        return (
          <Dialogs
            updateNewMessageBody={onChangeNewMessage}
            sendMessage={onSendMessageClick}
            dialogsPage={state.dialogsPage}
          />
        );
      }}
    </StoreContext.Consumer>
  );
}

export default DialogsContainer;
