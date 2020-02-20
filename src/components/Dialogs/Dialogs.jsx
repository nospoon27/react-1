import React from 'react';
import s from './Dialogs.module.css';

function Dialogs() {
  return (
    <div>
      <div className={s.dialogs}>
        <div className={s.dialogsItem}>
          <div className={s.dialog + ' ' + s.active}>Дим</div>
          <div className={s.dialog}>Сергей</div>
          <div className={s.dialog}>Игорь</div>
          <div className={s.dialog}>Евгений</div>
        </div>
        <div className={s.messages}>
          <div className={s.message}>Hi</div>
          <div className={s.message}>How is your</div>
          <div className={s.message}>Bye</div>
        </div>
      </div>
    </div>
  );
}

export default Dialogs;