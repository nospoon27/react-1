import React from "react";
import { reduxForm, Field } from "redux-form";
import { Input } from "../common/FormControls/FormsControl";
import { required } from '../../utils/validators/validators';
import { login } from '../../redux/authReducer'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import style from '../common/FormControls/FormControls.module.css'

let LoginForm = (props) => {
   const { handleSubmit } = props;
   return (
     <form onSubmit={handleSubmit}>
       <div>
         <Field
           type={"text"}
           name={"email"}
           placeholder={"Email"}
           component={Input}
           validate={[required]}
         />
       </div>
       <div>
         <Field
           type={"text"}
           name={"password"}
           placeholder={"Password"}
           type={"password"}
           component={Input}
           validate={[required]}
         />
       </div>
       <div>
         <label>Remember me?</label>
         <Field type={"checkbox"} name={"rememberMe"} component={Input} />
       </div>
       {props.error && (
         <div className={style.formSummaryError}>{props.error}</div>
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
      props.login(formData.email, formData.password, formData.rememberMe);
   }

   if(props.isAuth){
     return <Redirect to={'/profile'} />
   }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {
  login
})(Login);
