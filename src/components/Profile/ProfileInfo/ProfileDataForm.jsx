import React from "react";
import {
  createField,
  Input,
  Textarea,
} from "./../../common/FormControls/FormsControl";
import s from "./ProfileInfo.module.css";
import formControlStyle from "./../../common/FormControls/FormControls.module.css";
import { reduxForm } from "redux-form";

const ProfileDataForm = ({ profile, handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type={"submit"}>Save</button>
      </div>
      {error && (
        <div className={formControlStyle.formSummaryError}>{error}</div>
      )}
      <div>
        <b>Looking for a job:</b>{" "}
        {createField("looking for a job", "lookingForAJob", [], Input, {
          type: "checkbox",
        })}
      </div>
      <div>
        <b>About me: </b> {createField("about me", "aboutMe", [], Textarea)}
      </div>
      <div>
        <b>Looking for a job description: </b>{" "}
        {createField(
          "professional skills",
          "lookingForAJobDescription",
          [],
          Textarea
        )}
      </div>
      <div>
        <b>Full name: </b> {createField("full name", "fullName", [], Input)}
      </div>
      <div>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div className={s.contact} key={key}>
              <b>{key}: </b> {createField(key, `contacts.${key}`, [], Input)}
            </div>
          );
        })}
      </div>
    </form>
  );
};

const ProfileDataReduxForm = reduxForm({
  form: "profileData",
})(ProfileDataForm);

export default ProfileDataReduxForm;
