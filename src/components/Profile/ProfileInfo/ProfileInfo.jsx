import React from 'react'
import s from './ProfileInfo.module.css'

function ProfileInfo(props) {
  return (
    <div>
      <div className={s.profileImage}></div>
      <div className={s.profileDescription}>
        Description.... Lorem ipsum dolor sit.
      </div>
    </div>
  );
}

export default ProfileInfo
