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
} from '../../../Utils/firebase';
import { logo } from '../../../images/index';
import { defaultImg } from '../../../images/default';

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

const Logo = styled.img`
    width: 110px;
    margin-left: 30px;
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
    color: #172f2f;
    :hover {
        cursor: pointer;
        color: #996633;
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
`;

const MainProfileImg = styled.img`
    margin-top: 120px;
    width: 200px;
    border-radius: 10px;
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
    margin-top: 30px;
    background-color: #996633;
    :hover {
        cursor: pointer;
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
`;

const RecRowTitle = styled.div`
    margin-top: 60px;
    margin-left: 40px;
    display: flex;
    font-size: 24px;
`;

const MyCardsRow = styled.div`
    display: flex;
    width: 100%;
    margin-top: 20px;
`;

const RecCardsRow = styled.div`
    display: flex;
    width: calc(100% - 60px);
    margin-top: 20px;
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 300px;
    margin-left: 80px;
    border: 1px solid #996633;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.4);
    :hover {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.8);
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

const CardName = styled.div`
    font-size: 16px;
    margin-top: 10px;
    color: #5f3f1f;
`;

const CardImg = styled.img`
    width: 158px;
    height: 238px;
    border: 1px solid #5f3f1f;
    border-radius: 4px;

    :hover {
        cursor: pointer;
    }
`;

const MainPage = (props) => {
    const history = useHistory();
    const [imgArr, setImgArr] = useState([]);
    const [sampleImgArr, setSampleImgArr] = useState([]);
    const [profileName, setProfileName] = useState('');
    const [profileEmail, setProfileEmail] = useState('');

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

    useEffect(() => {
        // console.log('user', props);
        props.setCurrentUser({ email: props.match.params.id });

        mapDataForExplore(props.match.params.id).then((card) => {
            // console.log(card);
            setImgArr(card);
        });

        mapExampleDataForExplore().then((card) => {
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
                setProfileEmail
            );
        }
    }, [props.currentUser]);

    return (
        <>
            <Nav>
                <Logo src={logo} />
                <Logout onClick={handleLogout}>登出</Logout>
            </Nav>
            <MainContainer>
                <MainProfile>
                    <MainProfileImg src={defaultImg}></MainProfileImg>
                    <MainProfileName>{profileName}</MainProfileName>
                    <MainProfileMail>{profileEmail}</MainProfileMail>
                    <SendMailBtn onClick={navToSendCardPage}>
                        我要寄信
                    </SendMailBtn>
                </MainProfile>
                <MainCards>
                    <MyCardsRowTitle>我的卡片</MyCardsRowTitle>
                    <MyCardsRow>
                        <CardContainer onClick={handleCreateNewCard}>
                            <NewCard>+</NewCard>
                            <CardName>新增卡片</CardName>
                        </CardContainer>
                        {imgArr.map((img) => (
                            <CardContainer
                                data-id={img.basicSetting.id}
                                key={img.basicSetting.id}
                                onClick={handleEditExistCard}
                            >
                                <CardImg
                                    data-id={img.basicSetting.id}
                                    key={img.snapshot}
                                    src={
                                        img.snapshot
                                            ? img.snapshot
                                            : img.default
                                    }
                                    onClick={handleEditExistCard}
                                ></CardImg>
                                <CardName>{img.cardName}</CardName>
                            </CardContainer>
                        ))}
                    </MyCardsRow>
                    <RecRowTitle>為您推薦</RecRowTitle>
                    <RecCardsRow>
                        {sampleImgArr.map((img) => (
                            <CardContainer
                                data-id={img.basicSetting.id}
                                key={img.basicSetting.id}
                                onClick={handleEditExistCard}
                            >
                                <CardImg
                                    onClick={handleEditExistCard}
                                    data-id={img.basicSetting.id}
                                    key={img.snapshot}
                                    src={img.snapshot}
                                ></CardImg>
                                <CardName>{img.cardName}</CardName>
                            </CardContainer>
                        ))}
                    </RecCardsRow>
                </MainCards>
            </MainContainer>
        </>
    );
};

export default MainPage;
