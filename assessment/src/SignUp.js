import React, { useState } from 'react';
import { Button, Container, CssBaseline, Card, CardContent } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


import { createAuthUserWithEmailAndPassword, createUserProfileDocument } from './Firebase/config';
import LoadingIcon from './loadingIcon';

const SignUp = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [signedUpSuccessfully, setSignedUpSuccessfully] = useState(false);


    const handleChange = e => {
        const { value, name } = e.target;
        if(name === 'email') {
            setEmail(value);
        } else if(name === 'password') {
            setPassword(value);
        } else if(name === 'name') {
            setName(value);
        }
    };

    const formSubmit = async event => {
        event.preventDefault();

        try {
            setIsLoading(true);
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { name });
            if(user) {
                setName('');
                setEmail('');
                setPassword('');
                setIsLoading(false);
                setEmailError(false);
                setErrorText('');
                setSignedUpSuccessfully(true);
            }
        } catch (error) {
            console.log('signup error');
            console.error(error);
            setEmailError(true);
            setErrorText(error.message);
            setIsLoading(false);
        }
    };

    return (
        <div className='sign-up-container'>
            {isLoading && <LoadingIcon/>}
            {signedUpSuccessfully && (<div className={"signedup-div"}>User signed up successfully, please sign in.</div>)}
            <Container component="main" maxWidth="sm">
                <CssBaseline/>
                <Card>
                    <CardContent className="login-card-content-div">
                        <span className="header-span">User Sign Up</span>
                        <ValidatorForm className="login-page-form" onSubmit={formSubmit}>
                            <TextValidator
                                variant="outlined"
                                className="login-page-textfields"
                                fullWidth
                                id="name"
                                name="name"
                                label="User Name*"
                                validators={["required"]}
                                errorMessages={["This field is required."]}
                                value={name}
                                onChange={handleChange}
                                autoFocus
                            />
                            
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
                            />
                            
                            <TextValidator
                                // error={passwordError}
                                // helperText={passwordError && errorText}
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
                                Sign Up
                            </Button>
                        </ValidatorForm>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default SignUp;