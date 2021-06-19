import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { logo } from '../../../images/index';
import { nativeLogout } from '../../../Utils/firebase';
import Profile from '../../Profile';
import SendForm from './SendForm';

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    width: 100vw;
    height: 80px;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    z-index: 5;
`;

const LogoAnchor = styled.a`
    width: 110px;
    margin-left: 30px;
`;

const Logo = styled.img`
    width: 100%;
`;

const Logout = styled.div`
    width: 60px;
    height: 30px;
    border: 1px solid #172f2f;
    border-radius: 5px;
    margin-right: 30px;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #172f2f;
    :hover {
        cursor: pointer;
        background-color: #996633;
        border-color: #996633;
    }
`;

const MainContainer = styled.div`
    display: flex;
    width: 100%;
`;

const MainSendingArea = styled.div`
    display: flex;
    /* background-color: #f9f2ec; */
    box-shadow: inset 0 0 15px #b6b6b6;
    width: calc(100% - 300px);
    height: calc(100vh - 80px);
    margin-top: 80px;
    margin-left: 300px;
    align-items: center;
    justify-content: center;
`;

const SendPage = (props) => {
    const history = useHistory();

    const handleLogout = () => {
        nativeLogout();
        props.setCurrentUser({ email: 'noUser' });
    };

    useEffect(() => {
        if (props.currentUser && props.currentUser.email === 'noUser') {
            history.push('/');
        }
    }, [props.currentUser, history]);

    return (
        <>
            <Nav>
                <LogoAnchor href={`/main/${props.currentUser.email}`}>
                    <Logo src={logo} />
                </LogoAnchor>
                <Logout onClick={handleLogout}>登出</Logout>
            </Nav>
            <MainContainer>
                <Profile
                    currentUser={props.currentUser}
                    setCurrentUser={props.setCurrentUser}
                    {...props}
                />
                <MainSendingArea>
                    <SendForm
                        currentUser={props.currentUser}
                        setCurrentUser={props.setCurrentUser}
                        {...props}
                    />
                </MainSendingArea>
            </MainContainer>
        </>
    );
};

export default SendPage;
