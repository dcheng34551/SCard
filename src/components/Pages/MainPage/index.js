import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import {
    nativeLogout,
    createNewCard,
    navToSendCard,
    getDataForProfile,
    navToPreviewCard,
} from '../../../Utils/firebase';
import { logo } from '../../../images/index';
import { background } from '../../../images/background';
import CardsRow from './CardRow';
import Profile from '../../Profile';

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
`;

const LogoAnchor = styled.a`
    width: 110px;
    margin-left: 30px;
`;

const Logo = styled.img`
    width: 100%;
`;

const CreateNewCardBtn = styled.div`
    width: 110px;
    height: 30px;
    /* border: 1px solid #172f2f; */
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
`;

const MainContainer = styled.div`
    display: flex;
    width: 100%;
`;

const MainCards = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background-image: url(${background}); */
    /* background-color: #f9f2ec; */
    box-shadow: inset 0 0 15px #b6b6b6;
    margin-top: 80px;
    margin-left: 300px;
    width: calc(100% - 300px);
    z-index: 0;
    padding-bottom: 40px;
`;

const MainPage = (props) => {
    const history = useHistory();

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

    const navToSendCardPage = () => {
        navToSendCard(props.currentUser.email);
    };

    const navToShowCardPage = (e) => {
        navToPreviewCard(e.target.dataset.id);
    };

    // const openModal = () => {
    //     setModalIsOpen(true);
    // };

    // const afterOpenModal = () => {
    //     // do something
    // };

    // const closeModal = () => {
    //     setModalIsOpen(false);
    // };

    // useEffect(() => {
    //     if (onHoverCard !== '') {
    //         Modal.setAppElement(`[id=${onHoverCard}]`);
    //     }
    // }, [onHoverCard]);

    // useEffect(() => {
    //     subscribe(setImgArr, props.currentUser.email);
    // }, [setImgArr, props.currentUser.email]);

    return (
        <>
            <Nav>
                <LogoAnchor href={`/main/${props.currentUser.email}`}>
                    <Logo src={logo} />
                </LogoAnchor>
                <CreateNewCardBtn onClick={handleCreateNewCard}>
                    + 新增卡片
                </CreateNewCardBtn>
                <Logout onClick={handleLogout}>登出</Logout>
            </Nav>
            <MainContainer>
                <Profile
                    currentUser={props.currentUser}
                    setCurrentUser={props.setCurrentUser}
                    {...props}
                />
                {/* <MainProfile>
                    <MainProfileImg
                        src={profilePhoto === '' ? defaultImg : profilePhoto}
                    ></MainProfileImg>
                    {profileName !== '' ? (
                        <>
                            <MainProfileName>{profileName}</MainProfileName>
                            <MainProfileMail>{profileEmail}</MainProfileMail>
                        </>
                    ) : (
                        <ProfileLoadingContainer>
                            <ProfileLoadingImg src={profileLoading} />
                        </ProfileLoadingContainer>
                    )}
                    <SendMailBtn onClick={navToSendCardPage}>
                        我要寄信
                    </SendMailBtn>
                </MainProfile> */}
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
                    {/* <RecRowTitle>
                        <CardTitleIcon src={cardIcon} />
                        為您推薦
                    </RecRowTitle>
                    <RecCardsRow>
                        {JSON.stringify(sampleImgArr) !== '[]' ? (
                            <>
                                {sampleImgArr.map((img) => (
                                    <CardContainer
                                        data-id={img.basicSetting.id}
                                        key={img.basicSetting.id}
                                        onClick={navToShowCardPage}
                                    >
                                        <CardImg
                                            onClick={navToShowCardPage}
                                            data-id={img.basicSetting.id}
                                            key={img.snapshot}
                                            src={img.snapshot}
                                        ></CardImg>
                                        <CardName>{img.cardName}</CardName>
                                    </CardContainer>
                                ))}
                            </>
                        ) : (
                            <LoadingRow>
                                <LoadingImg src={mainLoading} />
                            </LoadingRow>
                        )}
                    </RecCardsRow> */}
                </MainCards>
            </MainContainer>
        </>
    );
};

export default MainPage;
