import React from 'react';
import styled from 'styled-components';
import { nativeLogout, createNewCard } from '../Utils/firebase';
import { v4 as uuidv4 } from 'uuid';
import { logo } from '../images';

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
    z-index: 2;
    background-color: #e1dad4;

    @media (max-width: 768px) {
        height: 60px;
    }
`;

const LogoAnchor = styled.a`
    width: 110px;
    margin-left: 30px;

    @media (max-width: 768px) {
        width: 80px;
    }
`;

const Logo = styled.img`
    width: 100%;
`;

const CreateNewCardBtn = styled.div`
    width: 110px;
    height: 30px;
    border-radius: 5px;
    margin-right: 24px;
    margin-left: auto;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #172f2f;
    background-color: white;
    box-shadow: 0 0 2px #172f2f;
    :hover {
        cursor: pointer;
        background-color: #996633;
        color: white;
        border-color: #996633;
    }

    @media (max-width: 768px) {
        height: 24px;
        width: 90px;
        font-size: 14px;
    }
`;

const Logout = styled.div`
    width: 60px;
    height: 30px;
    border: 1px solid #172f2f;
    border-radius: 5px;
    margin-right: 40px;
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

    @media (max-width: 768px) {
        height: 24px;
        width: 50px;
        font-size: 14px;
    }
`;

const Header = (props) => {
    const handleCreateNewCard = () => {
        const cardDetails = {
            id: uuidv4(),
        };
        createNewCard(cardDetails, props.currentUser.email);
    };

    const handleLogout = () => {
        nativeLogout();
        props.setCurrentUser({ email: 'noUser' });
    };

    return (
        <Nav
            style={
                props.type === 'landing'
                    ? { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                    : null
            }
        >
            <LogoAnchor href={`/main/${props.currentUser.email}`}>
                <Logo src={logo} />
            </LogoAnchor>
            {props.type === 'main' ? (
                <>
                    <CreateNewCardBtn onClick={handleCreateNewCard}>
                        + 新增卡片
                    </CreateNewCardBtn>
                    <Logout onClick={handleLogout}>登出</Logout>
                </>
            ) : props.type === 'send' ? (
                <>
                    <CreateNewCardBtn onClick={handleCreateNewCard}>
                        + 新增卡片
                    </CreateNewCardBtn>
                    <Logout onClick={handleLogout}>登出</Logout>
                </>
            ) : null}
        </Nav>
    );
};

export default Header;
