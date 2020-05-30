import React from 'react'
import s from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus';

function ProfileInfo(props) {
  if(!props.profile){
    return <Preloader />
  }
  return (
    <div>
      {/* <div className={s.profileImage}></div> */}
      <div className={s.profileDescription}>
        <img src={props.profile.photos.large} alt=""/>
        <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
      </div>
    </div>
  );
}

export default ProfileInfo
