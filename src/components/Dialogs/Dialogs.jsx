import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message'

function Dialogs(props) {

  let dialogsData = [
    {id: 1, name: 'Дим1'},
    {id: 2, name: 'Дим2'},
    {id: 3, name: 'Дим3'},
    {id: 4, name: 'Дим4'},
    {id: 5, name: 'Дим5'},
  ];

  let messagesData = [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'Hello'},
    {id: 3, message: 'Bye'},
    {id: 4, message: 'Yo'},
    {id: 5, message: 'Get cash'},
    {id: 6, message: 'Welcome'},
  ];

  let dialogs = dialogsData.map(d => <DialogItem id={d.id} name={d.name} />);
  let messages = messagesData.map(m => <Message id={m.id} message={m.message} />);

  return (
    <div>
      <div className={s.dialogs}>
        <div className={s.dialogsItem}>
          {dialogs}
        </div>
        <div className={s.messages}>
          {messages}
        </div>
      </div>
    </div>
  );
}

export default Dialogs;