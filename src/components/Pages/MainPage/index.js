import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import {
    nativeLogout,
    createNewCard,
    navToSendCard,
    mapDataForExplore,
    mapExampleDataForExplore,
    getDataForProfile,
    navToEditCard,
    deleteCard,
    navToPreviewCard,
} from '../../../Utils/firebase';
import { logo } from '../../../images/index';
import { defaultImg } from '../../../images/default';
import { deleteIcon, editIcon, cardIcon } from '../../../images/icons';
import { mainLoading, profileLoading } from '../../../images/loading';

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
    width: 100vw;
`;

const MainProfile = styled.div`
    display: flex;
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
    background-color: #f9f2ec;
    box-shadow: inset 0 0 10px #b6b6b6;
    width: calc(100vw - 330px);
`;

const MyCardsRowTitle = styled.div`
    margin-top: 120px;
    margin-left: 40px;
    display: flex;
    font-size: 24px;
    color: #432c16;
`;

const CardTitleIcon = styled.img`
    width: 30px;
    margin-right: 10px;
`;

const RecRowTitle = styled.div`
    margin-top: 60px;
    margin-left: 40px;
    display: flex;
    font-size: 24px;
    color: #432c16;
`;

const MyCardsRow = styled.div`
    display: flex;
    width: calc(100% - 80px);
    margin-top: 20px;
    margin-left: 80px;
`;

const LoadingRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 302px;
`;

const LoadingImg = styled.img`
    width: 80px;
`;

const RecCardsRow = styled.div`
    display: flex;
    width: calc(100% - 80px);
    margin-top: 20px;
    margin-left: 80px;
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 300px;
    margin-right: 40px;
    /* border: 1px solid #996633; */
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.8);
    :hover {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.6);
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }
`;

const NewCard = styled.div`
    display: flex;
    width: 160px;
    height: 240px;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    background-color: #996633;
    font-size: 40px;
    color: white;
    :hover {
        font-size: 50px;
    }
`;

const WhiteBtn = styled.img`
    width: 16px;
    filter: invert(100%) sepia(0%) saturate(100%) hue-rotate(100deg)
        brightness(100%) contrast(100%);
`;

const ExistCardDetails = styled.div`
    width: 160px;
    display: flex;
    justify-content: space-around;
`;

const CardName = styled.div`
    font-size: 16px;
    margin-top: 10px;
    color: #5f3f1f;
`;

const CardImg = styled.img`
    width: 158px;
    height: 238px;
    border: 1px solid #e3e3e3;
    border-radius: 4px;

    :hover {
        cursor: pointer;
    }
`;

const CardBtn = styled.div`
    text-align: center;
    background-color: #172f2f;
    color: white;
    border-radius: 4px;
    width: 24px;
    height: 24px;
    border: 1px solid #172f2f;
    margin-top: 10px;

    :hover {
        cursor: pointer;
        background-color: #996633;
        border: 1px solid #996633;
    }
`;

const MainPage = (props) => {
    const history = useHistory();
    const [imgArr, setImgArr] = useState([]);
    const [sampleImgArr, setSampleImgArr] = useState([]);
    const [profileName, setProfileName] = useState('');
    const [profileEmail, setProfileEmail] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');

    const handleCreateNewCard = () => {
        const cardDetails = {
            id: uuidv4(),
            // author: props.currentUser.email
        };
        console.log(cardDetails);
        // console.log(props.currentUser.email);
        createNewCard(cardDetails, props.currentUser.email);
    };

    const handleLogout = () => {
        nativeLogout();
        props.setCurrentUser({ email: 'noUser' });
    };

    const handleEditExistCard = (e) => {
        navToEditCard(e.target.dataset.id);
        // console.log('this', e.target);
    };

    const navToSendCardPage = () => {
        navToSendCard(props.currentUser.email);
    };

    const navToShowCardPage = (e) => {
        navToPreviewCard(e.target.dataset.id);
    };

    const handleDeleteCard = (e) => {
        deleteCard(props.currentUser.email, e.target.dataset.id, () => {
            mapDataForExplore(props.match.params.id).then((card) => {
                setImgArr(card);
            });

            mapExampleDataForExplore().then((card) => {
                setSampleImgArr(card);
            });
        });
    };

    useEffect(() => {
        // console.log('user', props);
        props.setCurrentUser({ email: props.match.params.id });

        mapDataForExplore(props.match.params.id).then((card) => {
            console.log(card);
            setImgArr(card);
        });

        mapExampleDataForExplore().then((card) => {
            console.log(card);
            setSampleImgArr(card);
        });
    }, []);

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

    return (
        <>
            <Nav>
                <LogoAnchor href={`/main/${props.currentUser.email}`}>
                    <Logo src={logo} />
                </LogoAnchor>
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
                    <MyCardsRowTitle>
                        <CardTitleIcon src={cardIcon} />
                        我的卡片
                    </MyCardsRowTitle>
                    <MyCardsRow>
                        <CardContainer onClick={handleCreateNewCard}>
                            <NewCard>+</NewCard>
                            <CardName>新增卡片</CardName>
                        </CardContainer>
                        {JSON.stringify(imgArr) !== '[]' ? (
                            <>
                                {imgArr.map((img) => (
                                    <CardContainer
                                        data-id={img.basicSetting.id}
                                        key={img.basicSetting.id}
                                        // onClick={handleEditExistCard}
                                    >
                                        <CardImg
                                            data-id={img.basicSetting.id}
                                            key={img.snapshot}
                                            src={
                                                img.snapshot
                                                    ? img.snapshot
                                                    : img.default
                                            }
                                            // onClick={handleEditExistCard}
                                        ></CardImg>
                                        <ExistCardDetails>
                                            <CardName>{img.cardName}</CardName>
                                            <CardBtn
                                                data-id={img.basicSetting.id}
                                                onClick={handleDeleteCard}
                                            >
                                                <WhiteBtn
                                                    src={deleteIcon}
                                                    data-id={
                                                        img.basicSetting.id
                                                    }
                                                ></WhiteBtn>
                                            </CardBtn>
                                            <CardBtn
                                                data-id={img.basicSetting.id}
                                                onClick={handleEditExistCard}
                                            >
                                                <WhiteBtn
                                                    src={editIcon}
                                                    data-id={
                                                        img.basicSetting.id
                                                    }
                                                ></WhiteBtn>
                                            </CardBtn>
                                        </ExistCardDetails>
                                    </CardContainer>
                                ))}
                            </>
                        ) : null}
                    </MyCardsRow>
                    <RecRowTitle>
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
                    </RecCardsRow>
                </MainCards>
            </MainContainer>
        </>
    );
};

export default MainPage;
