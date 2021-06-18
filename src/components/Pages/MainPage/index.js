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
import { defaultImg } from '../../../images/default';
import { profileLoading } from '../../../images/loading';
import { background } from '../../../images/background';
import CardsRowTest from './CardRowTest';

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
    width: 100px;
    height: 30px;
    border: 1px solid #172f2f;
    border-radius: 5px;
    margin-right: 24px;
    margin-left: auto;
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

const MainProfile = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: column;
    width: 330px;
    height: 100vh;
    background-color: #172f2f;
    align-items: center;
`;

const MainProfileName = styled.div`
    display: flex;
    width: 200px;
    margin-top: 30px;
    padding-left: 20px;
    font-size: 20px;
    color: white;
`;

const MainProfileMail = styled(MainProfileName)`
    font-size: 14px;
    margin-bottom: 30px;
`;

const MainProfileImg = styled.img`
    margin-top: 120px;
    width: 200px;
    border-radius: 10px;
`;

const ProfileLoadingContainer = styled.div`
    display: flex;
    width: 100%;
    height: 139px;
    align-items: center;
    justify-content: center;
`;

const ProfileLoadingImg = styled.img`
    width: 80px;
`;

const SendMailBtn = styled.div`
    width: 200px;
    height: 40px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: white;
    background-color: #996633;
    :hover {
        cursor: pointer;
        color: #996633;
        background-color: #fff;
    }
`;

const MainCards = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background-image: url(${background}); */
    /* background-color: #f9f2ec; */
    box-shadow: inset 0 0 15px #b6b6b6;
    margin-top: 80px;
    margin-left: 330px;
    width: calc(100% - 330px);
    z-index: 0;
    padding-bottom: 40px;
`;

const MainPage = (props) => {
    const history = useHistory();
    const [profileName, setProfileName] = useState('');
    const [profileEmail, setProfileEmail] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');

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

    useEffect(() => {
        if (props.currentUser && props.currentUser.email === 'noUser') {
            history.push('/');
        } else if (props.currentUser.email) {
            getDataForProfile(
                props.currentUser.email,
                setProfileName,
                setProfileEmail,
                setProfilePhoto
            );
        }
    }, [props.currentUser]);

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
                    新增卡片
                </CreateNewCardBtn>
                <Logout onClick={handleLogout}>登出</Logout>
            </Nav>
            <MainContainer>
                <MainProfile>
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
                </MainProfile>
                <MainCards>
                    <CardsRowTest
                        currentUser={props.currentUser}
                        setCurrentUser={props.setCurrentUser}
                        type={'myCard'}
                        {...props}
                    />
                    <CardsRowTest
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
