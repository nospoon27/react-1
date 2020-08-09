import React from "react";
import { reduxForm } from "redux-form";
import { Input, createField } from "../common/FormControls/FormsControl";
import { required } from "../../utils/validators/validators";
import { login } from "../../redux/authReducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import style from "../common/FormControls/FormControls.module.css";

let LoginForm = ({handleSubmit, error, captchaUrl}) => {
   return (
     <form onSubmit={handleSubmit}>
       {createField('Email', 'email', [required], Input, {type: 'email'})}
       {createField('Password', 'password', [required], Input, {type: 'password'})}
       {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'Remember me?')}

       {captchaUrl && <div>
         <img alt={'captcha'} src={captchaUrl} />
         {createField('Symbols from image', 'captcha', [required], Input)}
       </div>}
       {error && (
         <div className={style.formSummaryError}>{error}</div>
       )}
       <div>
         <button type={"submit"}>Login</button>
       </div>
     </form>
   );
}

const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

const Login = (props) => {
   const onSubmit = (formData) => {
      props.login(
        formData.email,
        formData.password,
        formData.rememberMe,
        formData.captcha
      );
   }

   if(props.isAuth){
     return <Redirect to={'/profile'} />
   }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, {
  login
})(Login);
