import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from 'react-router-dom';

function DialogItem(props) {
  let path = `/dialogs/${props.id}`;

  return (
    <NavLink to={path} className={s.dialog} activeClassName={s.active}>{props.name}</NavLink>
  );
}
export default DialogItem
