import React from 'react'
import s from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader';
import userPhoto from "./../../../assets/images/userPhoto1.png";
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

function ProfileInfo({profile, status, updateStatus, isOwner, savePhoto}) {
  if(!profile){
    return <Preloader />
  }
  const onMainPhotoSelected = (e) => {
    if(e.target.files.length){
      savePhoto(e.target.files[0]); 
    }
  }
  return (
    <div>
      {/* <div className={s.profileImage}></div> */}
      <div className={s.profileDescription}>
        <img src={profile.photos.large || userPhoto} alt="" width={'150px'}/>
        { isOwner && <input type={'file'} onChange={onMainPhotoSelected} /> }
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
}

export default ProfileInfo
