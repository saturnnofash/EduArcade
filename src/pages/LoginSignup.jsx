import React, {Fragment} from 'react';
import LoginSignup from '../components/Login-Signup/LoginSignup';
import Header from '../components/Header/Header';


const Login = () => {
  return (
    <Fragment>
        <Header/>
        <LoginSignup/>
    </Fragment>
  );
};

export default Login;

