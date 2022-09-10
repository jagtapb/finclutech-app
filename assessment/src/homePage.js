import React, { useState, useContext, useEffect } from 'react';
import { signOutUser, saveUserData, getUserData } from './Firebase/config';
import { Button } from '@material-ui/core';
import history from './history';

import LoadingIcon from './loadingIcon';
import { AuthContext } from './Firebase/context';
import BasicTable from './table';

import { rawUserdata } from './raw-data';
import EditUserPage from './EditUserPage';

import './App.css';


const HomePage = () => {
    const currentUser = useContext(AuthContext);
    const [showDataButton, setShowDataButton] = useState(false);
    const [rawdata, setRawData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [showAddEditPage, setShowAddEditPage] = useState(false);
    const [editUser, setEditUser] = useState({});

    
    // Default call on page load
    useEffect(() => {
        setIsLoading(true);
        getUserData().then(res => {
            if(res?.users?.length) {
                setRawData(res.users);
                setShowDataButton(false);
            } else {
                setShowDataButton(true);
            }
            setIsLoading(false);
        });
    }, []);
    

    // Function for signOut
    const signOut = async event => {
        event.preventDefault();
        signOutUser();
        localStorage.setItem('userToken', '');
        history.push('/');
        window.location.reload();
    };

    // Function for seting raw data from json
    const setUserData = () => {
        setRawData(rawUserdata.Full);
        saveUserData(rawUserdata.Full);
        setShowDataButton(false);
        setEditUser({});
    };

    //Function for removing user from table
    const removeUser = index => {
        const filteredUsers = rawdata.filter((user, i) => i!==index);
        saveUserData(filteredUsers);
        setRawData(filteredUsers);
        setEditIndex(null);
        setShowAddEditPage(false);
        setEditUser({});
        
        if(filteredUsers.length) {
            setShowDataButton(false);
        } else {
            setShowDataButton(true);
        }
    };

    //Function for editing user from table
    const onClickEditIcon = (user, index) => {
        setShowAddEditPage(true);
        setEditIndex(index);
        setEditUser(rawdata.filter((user, i) => i===index));
    };

    //Function for adding user to table
    const addUser = (data) => {
        let updatedUser = [];
        if(editIndex != null) {
            const filteredUsers = rawdata.filter((user, i) => i!==editIndex);
            updatedUser = [...filteredUsers, data];
        } else {
            updatedUser = [...rawdata, data];
        }
        setRawData(updatedUser);    
        saveUserData(updatedUser);
        setShowAddEditPage(false);
        setEditIndex(null);
        setEditUser({});
    };

    // if '/home' is directly hit, it will redirect to signup page
    if(!localStorage.getItem('userToken')) {
        history.push('/');
        window.location.reload();    
    }

    return (
        <>
            <div className={'users-container'}>
                <Button onClick={signOut} style={{margin: '25px 50px', display: 'flex', alignSelf: 'flex-end', fontSize: '18px'}}>logout</Button>
                <div className={"header"}>Welcome { currentUser && currentUser.user ? currentUser.user.name : '' }</div>
                {showAddEditPage && (
                    <EditUserPage 
                        addUser={addUser} 
                        count={rawdata.length}
                        editUser={editUser?.[0]}
                    />
                )}
                
                {!showAddEditPage && (
                    <>
                        <Button
                            variant="contained" 
                            style={{margin: '20px'}} 
                            color="primary" 
                            onClick={()=> setShowAddEditPage(true)}>
                                Add User
                        </Button>

                        <div style={{marginBottom: '50px'}}>
                            <h1 style={{alignSelf: 'center'}}>User Management System</h1>
                            {isLoading && <LoadingIcon/>}
                            { currentUser && currentUser.user && rawdata && (
                                <BasicTable 
                                    rows={rawdata} 
                                    editIndex={editIndex} 
                                    onClickEditIcon={onClickEditIcon} 
                                    removeUser={removeUser} 
                                />
                            )}
                        </div>

                        { showDataButton && (
                            <Button
                                variant="contained" 
                                style={{margin: '20px'}} 
                                color="primary" 
                                onClick={setUserData}>
                                    Get Raw Data
                            </Button>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default HomePage;