import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'

function Profile(props) {
  return (
    <div className={s.profileWrapper}>
      <ProfileInfo />
      <MyPosts 
      posts={props.profilePage.posts} 
      dispatch={props.dispatch}
      newPostText={props.profilePage.newPostText} />
    </div>
  );
}

export default Profile;