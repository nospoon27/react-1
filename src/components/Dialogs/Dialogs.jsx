import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from 'react-router-dom'

function Dialogs(props) {
  return (
    <div>
      <div className={s.dialogs}>
        <div className={s.dialogsItem}>
          <DialogItem id="1" name="Дим"/>
          <DialogItem id="2" name="Сергей"/>
          <DialogItem id="3" name="Игорь"/>
          <DialogItem id="4" name="Евгений"/>
        </div>
        <div className={s.messages}>
          <Message message="Hi"/>
          <Message message="How is your"/>
          <Message message="Bye"/>
        </div>
      </div>
    </div>
  );
}

function DialogItem(props) {
  let path = `/dialogs/${props.id}`;

  return (
    <NavLink to={path} className={s.dialog} activeClassName={s.active}>{props.name}</NavLink>
  );
}

function Message(props) {
  return <div className={s.message}>{props.message}</div>
}

export default Dialogs;