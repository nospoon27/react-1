import React from 'react';
import { Field, reduxForm } from 'redux-form';
import s from './Dialogs.module.css';
import { Textarea } from '../common/FormControls/FormsControl';
import { required, maxLenght } from '../../utils/validators/validators';

const maxLenght100 = maxLenght(100);

const AddMessageForm = (props) => {
   let {handleSubmit} = props;
   return (
     <form onSubmit={handleSubmit} className={s.newMessageBlock}>
       <div className={s.text}>
         <Field
           component={Textarea}
           validate={[required, maxLenght100]}
           name={"newMessageBody"}
           placeholder={"placeholder"}
         />
       </div>
       <div className={s.action}>
         <button type={"submit"}>Send</button>
       </div>
     </form>
   );
 }

 export default reduxForm({
    'form': 'newMessage'
 })(AddMessageForm);