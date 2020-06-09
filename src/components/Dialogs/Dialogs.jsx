import React from 'react';
import s from './Dialogs.module.css';
import {Redirect} from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message'
import AddMesageForm from './AddMesageForm';


function Dialogs(props) {
  let dialogs = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} />);
  let messages = props.dialogsPage.messages.map(m => <Message key={m.id} id={m.id} message={m.message} />);

  let addNewMessage = (values) => {
    alert(values.newMessageBody);
    props.sendMessage(values.newMessageBody);
  }

  if(!props.isAuth) return <Redirect to={"/login"} /> 

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
          <AddMesageForm onSubmit={addNewMessage} />
        </div>
      </div>
    </div>
  );
}

export default Dialogs;