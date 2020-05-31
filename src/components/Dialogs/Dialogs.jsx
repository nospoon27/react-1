import React from 'react';
import s from './Dialogs.module.css';
import {NavLink, Redirect} from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message'
import { updateNewMessageBodyCreater, sendMessageCreator } from '../../redux/dialogsReducer';
import { Field, reduxForm } from 'redux-form';

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
          <NewMessageReduxForm onSubmit={addNewMessage} />
        </div>
      </div>
    </div>
  );
}

const AddMessageForm = (props) => {
  let {handleSubmit} = props;
  return (
    <form onSubmit={handleSubmit} className={s.newMessageBlock}>
      <div className={s.text}>
        <Field component={'textarea'} name={'newMessageBody'} placeholder={'placeholder'} />
      </div>
      <div className={s.action}>
        <button type={'submit'}>Send</button>
      </div>
    </form>
  );
}

const NewMessageReduxForm = reduxForm({
  form: 'newMessage'
})(AddMessageForm);

export default Dialogs;