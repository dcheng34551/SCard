import React, { useState, useEffect } from 'react';
import { nativeLogout } from '../../../Utils/firebase';
import { useHistory } from 'react-router-dom';

const MainPage = (props) => {
    const history = useHistory();
    const handleLogout = () => {
        nativeLogout();
        props.setCurrentUser({ email: 'noUser' });
    };

    useEffect(() => {
        console.log(props.currentUser.email);
    }, []);

    useEffect(() => {
        if (props.currentUser && props.currentUser.email === 'noUser') {
            history.push('/login');
        }
    }, [props.currentUser]);
    return (
        <div>
            MainPage
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

export default MainPage;
