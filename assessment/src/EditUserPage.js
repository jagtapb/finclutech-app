import React, { useState } from 'react';
import { Button, Container, CssBaseline, Card, CardContent } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


const EditUserPage = ({addUser, count, editUser}) => {
    const [FirstName, setFirstName] = useState(editUser?.FirstName);
    const [LastName, setLastName] = useState(editUser?.LastName);
    const [City, setCity] = useState(editUser?.City);
    const [State, setState] = useState(editUser?.State);
    const [Country, setCountry] = useState(editUser?.Country);
    const [Gender, setGender] = useState(editUser?.Gender);
    const [Age, setAge] = useState(editUser?.Age);
    const [StudentStatus, setStudentStatus] = useState(editUser?.StudentStatus);
    const [Major, setMajor] = useState(editUser?.Major);
    const [SAT, setSAT] = useState(editUser?.SAT);
    const [Grade, setGrade] = useState(editUser?.Grade);
    const [Height, setHeight] = useState(editUser?.Height);    

    const handleChange = e => {
        const { value, name } = e.target;
        if(name === 'FirstName') {
            setFirstName(value);
        } else if(name === 'LastName') {
            setLastName(value);
        } else if(name === 'City') {
            setCity(value);
        } else if(name === 'State') {
            setState(value);
        } else if(name === 'Country') {
            setCountry(value);
        } else if(name === 'Gender') {
            setGender(value);
        } else if(name === 'Age') {
            setAge(value);
        } else if(name === 'StudentStatus') {
            setStudentStatus(value);
        } else if(name === 'Major') {
            setMajor(value);
        } else if(name === 'SAT') {
            setSAT(value);
        } else if(name === 'Grade') {
            setGrade(value);
        } else if(name === 'Height') {
            setHeight(value);
        }
    };

    const formSubmit = async event => {
        event.preventDefault();
        let data = {
            FirstName,
            LastName,
            Age,
            Major,
            Country,
            SAT,
            Grade,
            Height,
            StudentStatus,
            City,
            State,
            Gender
        };
        if(editUser) {
            data["ID"] = editUser?.ID;
        } else {
            data["ID"] = count+1;
        }
        addUser(data);
    };
    
    return (
        <div className='sign-up-container'>
            <Container component="main" maxWidth="sm">
                <CssBaseline/>
                <Card>
                    <CardContent className="login-card-content-div">
                        <span className="header-span">Add/Edit User Data</span>
                        <ValidatorForm className="login-page-form" onSubmit={formSubmit}>
                            <TextValidator
                                variant="outlined"
                                className="login-page-textfields"
                                fullWidth
                                id={'FirstName'}
                                name={'FirstName'}
                                label={'FirstName'}
                                value={FirstName}
                                onChange={handleChange}
                            />

                            <TextValidator
                                variant="outlined"
                                className="login-page-textfields"
                                fullWidth
                                id={'LastName'}
                                name={'LastName'}
                                label={'LastName'}
                                value={LastName}
                                onChange={handleChange}
                            />

                            <TextValidator
                                variant="outlined"
                                className="login-page-textfields"
                                fullWidth
                                id={'City'}
                                name={'City'}
                                label={'City'}
                                value={City}
                                onChange={handleChange}
                            />

                            <TextValidator
                                variant="outlined"
                                className="login-page-textfields"
                                fullWidth
                                id={'State'}
                                name={'State'}
                                label={'State'}
                                value={State}
                                onChange={handleChange}
                            />

                            <TextValidator
                                variant="outlined"
                                className="login-page-textfields"
                                fullWidth
                                id={'StudentStatus'}
                                name={'StudentStatus'}
                                label={'StudentStatus'}
                                value={StudentStatus}
                                onChange={handleChange}
                            />

                            <TextValidator
                                variant="outlined"
                                className="login-page-textfields"
                                fullWidth
                                id={'Gender'}
                                name={'Gender'}
                                label={'Gender'}
                                value={Gender}
                                onChange={handleChange}
                            />

                            <TextValidator
                                variant="outlined"
                                className="login-page-textfields"
                                fullWidth
                                id={'Major'}
                                name={'Major'}
                                label={'Major'}
                                value={Major}
                                onChange={handleChange}
                            />

                            <TextValidator
                                variant="outlined"
                                className="login-page-textfields"
                                fullWidth
                                id={'Country'}
                                name={'Country'}
                                label={'Country'}
                                value={Country}
                                onChange={handleChange}
                            />

                            <TextValidator
                                variant="outlined"
                                className="login-page-textfields"
                                fullWidth
                                id={'Age'}
                                name={'Age'}
                                label={'Age'}
                                value={Age}
                                onChange={handleChange}
                            />

                            <TextValidator
                                variant="outlined"
                                className="login-page-textfields"
                                fullWidth
                                id={'SAT'}
                                name={'SAT'}
                                label={'SAT'}
                                value={SAT}
                                onChange={handleChange}
                            />

                            <TextValidator
                                variant="outlined"
                                className="login-page-textfields"
                                fullWidth
                                id={'Grade'}
                                name={'Grade'}
                                label={'Grade'}
                                value={Grade}
                                onChange={handleChange}
                            />

                            <TextValidator
                                variant="outlined"
                                className="login-page-textfields"
                                fullWidth
                                id={'Height'}
                                name={'Height'}
                                label={'Height'}
                                value={Height}
                                onChange={handleChange}
                            />



                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                            >
                                {!editUser ? 'Add' : 'Save'}
                            </Button>
                        </ValidatorForm>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default EditUserPage;