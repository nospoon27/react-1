import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts'

function Profile () {
   return (
      <div className={s.content}>
        <div>
          <img className={s.image} src="https://img3.goodfon.ru/original/2880x1800/1/2f/ozero-gory-lesa-derevya.jpg"/>
        </div>
        <div>
          ava + desc
        </div>
        <MyPosts />
      </div>
   );
}

export default Profile;