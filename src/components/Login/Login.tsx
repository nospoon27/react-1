import React, { FC } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { Input, createField } from "../common/FormControls/FormsControl";
import { required } from "../../utils/validators/validators";
import { login } from "../../redux/authReducer";
import { connect, MapStateToProps } from "react-redux";
import { Redirect } from "react-router-dom";
import style from "../common/FormControls/FormControls.module.css";
import { AppStateType } from "../../redux/reduxStore";

type LoginFormOwnProps = {
  captchaUrl: string | null
}

let LoginForm: FC<InjectedFormProps<LoginFormValues, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
   return (
     <form onSubmit={handleSubmit}>
       {createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input, {type: 'email'})}
       {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, {type: 'password'})}
       {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, {type: 'checkbox'}, 'Remember me?')}

       {captchaUrl && <div>
         <img alt={'captcha'} src={captchaUrl} />
         {createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [required], Input)}
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

const LoginReduxForm = reduxForm<LoginFormValues, LoginFormOwnProps>({ form: 'login' })(LoginForm);

type MapStatePropsType = {
   captchaUrl: string | null;
   isAuth: boolean;
};

type MapDispatchToPropsType = {
   login: (email: string, password: string, rememberMe: boolean, captcha: string) => void;
};

type LoginFormValues =  {
  email: string,
  password: string, 
  rememberMe: boolean, 
  captcha: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValues, string>

const Login: FC<MapStatePropsType & MapDispatchToPropsType> = (props) => {
   const onSubmit = (formData: any) => {
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, { login })(Login);
