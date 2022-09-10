import React, { useState } from 'react';
import { Button, Container, CssBaseline, Card, CardContent } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { signInAuthUserWithEmailAndPassword } from './Firebase/config';
import history from './history';
import LoadingIcon from './loadingIcon';


const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = e => {
        const { value, name } = e.target;
        if(name === 'email') {
            setEmail(value);
        } else if(name === 'password') {
            setPassword(value);
        }
    };

    const formSubmit = async event => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            if(user) {
                localStorage.setItem('userToken', user.uid);
                history.push('/home');
                setEmail('');
                setPassword('');
                setIsLoading(false);
                window.location.reload();
            }
          } catch (error) {
            if(error.code === 'auth/wrong-password') {
                setEmailError(false);
                setPasswordError(true);
            } else {
                setEmailError(true);
                setPasswordError(false);
            }
            setErrorText(error.message);
            setIsLoading(false);
        }
    };
    
    return (
        <div className='sign-up-container'>
            {isLoading && <LoadingIcon/>}
            <Container component="main" maxWidth="sm">
                <CssBaseline/>
                <Card>
                    <CardContent className="login-card-content-div">
                        <span className="header-span">User Sign In</span>
                        <ValidatorForm className="login-page-form" onSubmit={formSubmit}>
                            <TextValidator
                                error={emailError}
                                helperText={emailError && errorText}
                                variant="outlined"
                                className="login-page-textfields"
                                fullWidth
                                id="email_id"
                                name="email"
                                label="Email Address*"
                                validators={["required", "isEmail"]}
                                errorMessages={["This field is required.", "Email address not valid. Please enter a valid email address."]}
                                value={email}
                                onChange={handleChange}
                                autoFocus
                            />
                            
                            <TextValidator
                                error={passwordError}
                                helperText={passwordError && errorText}
                                variant="outlined"
                                className="login-page-textfields"
                                fullWidth
                                type="password"
                                id="password"
                                name="password"
                                label="Password*"
                                validators={["required"]}
                                errorMessages={["This field is required."]}
                                value={password}
                                onChange={handleChange}
                            />
                            
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                            >
                                Sign In
                            </Button>
                        </ValidatorForm>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default SignIn;