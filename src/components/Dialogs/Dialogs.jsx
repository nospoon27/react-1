import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message'

function Dialogs(props) {
  
  let dialogs = props.state.dialogs.map(d => <DialogItem id={d.id} name={d.name} />);
  let messages = props.state.messages.map(m => <Message id={m.id} message={m.message} />);

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
              <textarea placeholder='Message'></textarea>
            </div>
            <div className={s.action}>
              <button>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialogs;