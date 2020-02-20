import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts'

function Profile () {
   return (
      <div className={s.profileWrapper}>
        <div className={s.profileImage}></div>
        <div className={s.profileDescription}>
          Description.... Lorem ipsum dolor sit.
        </div>
        <MyPosts />
      </div>
   );
}

export default Profile;