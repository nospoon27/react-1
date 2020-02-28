import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message'
import { updateNewMessageBodyCreater, sendMessageCreator } from '../../redux/state';

function Dialogs(props) {
  
  let dialogs = props.state.dialogs.map(d => <DialogItem id={d.id} name={d.name} />);
  let messages = props.state.messages.map(m => <Message id={m.id} message={m.message} />);
  let newMessageBody = props.state.messagePage.newMessageBody;);
  
  let onSendMessageClick = () => {
    let text = props.state.messagePage.newMessageBody;
    props.store.dispatch(sendMessageCreatoreator(text));
  }
  let onChangeNewMessage = (e) => {
    let body = e.target.value;
    props.store.dispatch(updateNewMessageBodyCreaterodyCreater())
  }

  return (
    <div>
      <div className={s.dialogs}>
        <div className={s.dialogsItem}>
          {dialogs}
        </div>
        <div className={s.messagesWrapper}>
          <div className={s.messages}>
            {messages}
          </div>
          <div className={s.newMessageBlock}>
            <div className={s.text}>
              <textarea placeholder='Message' 
                value={newMessageBody}
                onChange={onChangeNewMessage} ></textarea>
            </div>
            <div className={s.action}>
              <button onClick={() => { onSendMessageClick }}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialogs;