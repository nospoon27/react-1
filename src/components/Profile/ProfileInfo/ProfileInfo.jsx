import React, { useState } from 'react'
import s from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader';
import userPhoto from "./../../../assets/images/userPhoto1.png";
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';
import Contact from './Contact';
import ProfileDataReduxForm from './ProfileDataForm';

function ProfileInfo({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) {
  const [editMode, setEditMode] = useState(false);
  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
  };
  if (!profile) {
    return <Preloader />;
  }
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };
  const onSubmit = (formData) => {
    saveProfile(formData).then(() =>{
      deactivateEditMode();
    });
    // deactivateEditMode();
  };
  return (
    <div>
      {/* <div className={s.profileImage}></div> */}
      <div className={s.profileDescription}>
        <img src={profile.photos.large || userPhoto} alt="" width={"150px"} />
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
        {editMode ? (
          <ProfileDataReduxForm initialValues={profile} onSubmit={onSubmit} profile={profile} deactivateEditMode={deactivateEditMode} />
        ) : (
          <ProfileData profile={profile} isOwner={isOwner} activateEditMode={activateEditMode} />
        )}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
}

const ProfileData = ({profile, isOwner, activateEditMode}) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={activateEditMode}>Edit</button>
        </div>
      )}
      <div>
        <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My professional skills: </b>{" "}
          {profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>About me: </b> {profile.aboutMe}
      </div>

      <div>
        <b>Full name: </b> {profile.fullName}
      </div>
      <div>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
          );
        })}
      </div>
    </div>
  );
}

export default ProfileInfo
