import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import history from './history';

import './App.css';

const SignInAndSignUp = () => {
    // if User already logged-in then redirect to home page
    if(localStorage.getItem('userToken')) {
        history.push('/home');
        // window.location.reload();
        return false;
    }
    
    return (
        <div className='sign-in-and-sign-up'>
            <SignIn />
            <SignUp />
        </div>
    );
};

export default SignInAndSignUp;