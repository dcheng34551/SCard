import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import {
    nativeLogout,
    createNewCard,
    navToSendCard,
    mapDataForExplore,
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
    font-size: 20px;
    color: white;
`;

const MainProfileImg = styled.img`
    margin-top: 120px;
    width: 200px;
    border-radius: 10px;
`;

const SendMailBtn = styled.div`
    width: 200px;
    height: 40px;
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
    background-color: #f3f3f3;
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
    margin-left: 60px;
`;

const NewCard = styled.div`
    display: flex;
    width: 160px;
    height: 240px;
    align-items: center;
    justify-content: center;
    background-color: gray;
    margin-left: 80px;
    font-size: 40px;
    :hover {
        cursor: pointer;
    }
`;

const CardImg = styled.img`
    width: 160px;
    margin-left: 20px;
    :hover {
        cursor: pointer;
    }
`;

const MainPage = (props) => {
    const history = useHistory();
    const [imgArr, setImgArr] = useState([]);
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
    }, []);

    // useEffect(() => {
    //     // console.log(`This is ${imgArr}`);
    // }, [imgArr]);

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
                    <MainProfileName>{profileEmail}</MainProfileName>
                    <SendMailBtn onClick={navToSendCardPage}>
                        我要寄信
                    </SendMailBtn>
                </MainProfile>
                <MainCards>
                    <MyCardsRowTitle>我的卡片</MyCardsRowTitle>
                    <MyCardsRow>
                        <NewCard onClick={handleCreateNewCard}>+</NewCard>
                        {imgArr.map((img) => (
                            <CardImg
                                onClick={handleEditExistCard}
                                key={img.snapshot}
                                data-id={img.basicSetting.id}
                                src={img.snapshot}
                            ></CardImg>
                        ))}
                    </MyCardsRow>
                    <RecRowTitle>為您推薦</RecRowTitle>
                    <RecCardsRow>
                        {imgArr.map((img) => (
                            <CardImg
                                // onClick={handleEditExistCard}
                                key={img.snapshot}
                                src={img.snapshot}
                            ></CardImg>
                        ))}
                    </RecCardsRow>
                </MainCards>
            </MainContainer>
        </>
    );
};

export default MainPage;
