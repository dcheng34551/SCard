import React from 'react';
import styled from 'styled-components';
import CardsRow from './CardRow';
import Profile from '../../Profile';
import Header from '../../Header';

const MainContainer = styled.div`
    display: flex;
    width: 100%;
`;

const MainCards = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: inset 0 0 15px #b6b6b6;
    margin-top: 80px;
    margin-left: 300px;
    width: calc(100% - 300px);
    z-index: 0;
    padding-bottom: 40px;

    @media (max-width: 768px) {
        margin-top: 60px;
        width: 100%;
        margin-left: 0;
        padding-bottom: 100px;
    }
`;

const MainPage = (props) => {
    return (
        <>
            <Header
                currentUser={props.currentUser}
                setCurrentUser={props.setCurrentUser}
                type="main"
            />
            <MainContainer>
                <Profile
                    currentUser={props.currentUser}
                    setCurrentUser={props.setCurrentUser}
                    type="main"
                    {...props}
                />
                <MainCards>
                    <CardsRow
                        currentUser={props.currentUser}
                        setCurrentUser={props.setCurrentUser}
                        type={'myCard'}
                        {...props}
                    />
                    <CardsRow
                        currentUser={props.currentUser}
                        setCurrentUser={props.setCurrentUser}
                        type={'recCard'}
                        {...props}
                    />
                </MainCards>
            </MainContainer>
        </>
    );
};

export default MainPage;
