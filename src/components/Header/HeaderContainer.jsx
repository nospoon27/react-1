import React, { Component } from 'react'
import Header from './Header'
import axios from 'axios';
import {setAuthUserData} from '../../redux/authReducer'
import { connect } from 'react-redux';

class HeaderContainer extends Component {
   componentDidMount() {
      axios
        .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
          withCredentials: true,
        })
        .then((responce) => {
           let {id, email, login} = responce.data.data;
           if(responce.data.resultCode === 0) {
               this.props.setAuthUserData(id, login, email)
           }
        });
   }

   render() {
      return (
         <Header {...this.props}/>
      )
   }
}

const mapStateToProps = (state) => ({
   isAuth: state.auth.isAuth,
   login: state.auth.login
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);