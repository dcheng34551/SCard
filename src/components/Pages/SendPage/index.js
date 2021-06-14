import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { logo } from '../../../images/index';
import {
    nativeLogout,
    createNewCard,
    navToSendCard,
    mapDataForExplore,
    getDataForProfile,
    navToEditCard,
    navToMainPage,
    sendMail,
    getAllSnapshots,
    mapDataForOptions,
} from '../../../Utils/firebase';
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

const MainSendingArea = styled.div`
    display: flex;
    background-color: #a6a6a6;
    width: calc(100vw - 330px);
    height: calc(100vh - 80px);
    margin-top: 80px;
    align-items: center;
    justify-content: center;
`;

const MainSendingForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 800px;
    height: 620px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(100, 100, 100, 0.6);
    align-items: center;
`;

const MainSendingFormTitle = styled.div`
    width: 80%;
    font-size: 24px;
    color: #172f2f;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 1px solid #172f2f;
    margin-top: 20px;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    margin-top: 10px;
`;

const MainSendingFormLabel = styled.label`
    font-size: 18px;
    margin-right: 20px;
    width: 80px;
`;

const MainSendingCardSelect = styled.select`
    width: 30%;
    height: 30px;
    text-indent: 20px;
    font-size: 18px;
`;

const MainSendingFormInput = styled.input`
    width: 70%;
    height: 30px;
    border: 1px solid rgba(100, 100, 100, 0.6);
    text-indent: 20px;
    font-size: 18px;
    color: rgba(100, 100, 100, 0.6);
    border-radius: 5px;
`;

const PreviewContainer = styled.div`
    display: flex;
    width: 80%;
    margin-top: 10px;
`;

const PreviewTitle = styled.div`
    font-size: 18px;
    margin-right: 20px;
    width: 80px;
`;

const PreviewArea = styled.div`
    width: 70%;
    height: 300px;
    border: 1px solid rgba(100, 100, 100, 0.6);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: gray;
`;

const PreviewAreaEmtpyWarning = styled.div`
    font-size: 18px;
    color: #172f2f;
`;

// 卡片預覽
const Card = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: ${(props) =>
        props.cardOpend ? 'translate(0, -50%)' : 'translate(-50%, -50%)'};
    width: 180px;
    height: 270px;
    /* background-image: url('https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80'); */
    background-image: ${(props) => `url('${props.snapshot}')`};
    background-size: cover;
    background-position: center;
    perspective: 3000px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
    transition: 0.5s;
`;

const Cover = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    /* box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3); */
    transform: rotateY(0);
    transform-origin: left;
    transform-style: preserve-3d;
    transition: 0.5s;
    transform: ${(props) =>
        props.cardOpend ? 'rotateY(-150deg)' : 'rotateY(0deg)'};
`;

const Content = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;

const LeftContent = styled(Content)`
    /* background-image: url('https://images.unsplash.com/photo-1554568218-0f1715e72254?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'); */
    background-image: ${(props) => `url('${props.snapshot}')`};
    background-size: cover;
    background-position: center;
`;

const RightContent = styled(Content)`
    background-color: white;
    transform: rotateY(180deg);
    background-image: ${(props) => `url('${props.snapshot}')`};
    background-size: cover;
    background-position: center;
`;

const SubmitBtn = styled.input`
    margin-top: 10px;
    font-size: 20px;
    width: 80%;
    height: 40px;
    border: none;
    border-radius: 5px;
    background-color: #172f2f;
    color: white;
    :hover {
        cursor: pointer;
    }
`;

const SendPage = (props) => {
    const history = useHistory();
    const [imgArr, setImgArr] = useState([]);
    const [profileName, setProfileName] = useState('');
    const [profileEmail, setProfileEmail] = useState('');
    const [selectedCard, setSelectedCard] = useState('');
    const [email, setEmail] = useState('');
    const [recipient, setRecipient] = useState('');
    const [sender, setSender] = useState('');
    const [options, setOptions] = useState([]);

    const navToMain = () => {
        // console.log(props.currentUser);
        navToMainPage(props.currentUser.email);
    };

    const handleSendMail = (e) => {
        e.preventDefault();
        sendMail(
            `https://scard-45610.web.app/show/${selectedCard}`,
            email,
            recipient,
            sender
        );
    };

    useEffect(() => {
        console.log('user', props);
        props.setCurrentUser({ email: props.match.params.id });

        mapDataForOptions(props.match.params.id).then((option) => {
            setOptions(option);
        });
    }, []);

    useEffect(() => {
        if (props.currentUser && props.currentUser.email === 'noUser') {
            history.push('/login');
        } else if (props.currentUser.email) {
            getDataForProfile(
                props.currentUser.email,
                setProfileName,
                setProfileEmail
            );
        }
    }, [props.currentUser]);

    // card prview
    const [cardId, setCardId] = useState('');
    const [cardOpend, setCardOpened] = useState(false);
    const [coverSnapshot, setCoverSnapshot] = useState('');
    const [leftInnerSnapshot, setLeftInnerSnapshot] = useState('');
    const [rightInnerSnapshot, setRightInnerSnapshot] = useState('');

    const handleCardOpened = () => {
        setCardOpened(!cardOpend);
    };

    useEffect(() => {
        setCardId(selectedCard);
    }, [selectedCard]);

    useEffect(() => {
        if (cardId !== '') {
            getAllSnapshots(
                cardId,
                setCoverSnapshot,
                setLeftInnerSnapshot,
                setRightInnerSnapshot
            );
        }
    }, [cardId]);

    return (
        <>
            <Nav>
                <Logo src={logo} />
                <Logout>登出</Logout>
            </Nav>
            <MainContainer>
                <MainProfile>
                    <MainProfileImg src={defaultImg}></MainProfileImg>
                    <MainProfileName>{profileName}</MainProfileName>
                    <MainProfileName>{profileEmail}</MainProfileName>
                    <SendMailBtn onClick={navToMain}>回到主頁</SendMailBtn>
                </MainProfile>
                <MainSendingArea>
                    <MainSendingForm onSubmit={handleSendMail}>
                        <MainSendingFormTitle>我要寄信</MainSendingFormTitle>
                        <InputContainer>
                            <MainSendingFormLabel htmlFor="select">
                                選擇卡片:
                            </MainSendingFormLabel>
                            <MainSendingCardSelect
                                id="select"
                                onChange={(e) => {
                                    setSelectedCard(e.target.value);
                                }}
                                value={selectedCard}
                            >
                                {options.map((option) => (
                                    <option
                                        value={option.basicSetting.id}
                                        key={option.basicSetting.id}
                                    >
                                        {option.cardName
                                            ? option.cardName
                                            : option.basicSetting.id}
                                    </option>
                                ))}
                                {/* <option value="e371aac6-b4f9-4d13-b475-0d71369704e9">
                                    母親節卡片
                                </option>
                                <option value="c282bb8c-5463-4a48-8e11-b5736d46b5d2">
                                    生日卡片
                                </option> */}
                            </MainSendingCardSelect>
                        </InputContainer>
                        <InputContainer>
                            <MainSendingFormLabel htmlFor="email">
                                郵箱地址:
                            </MainSendingFormLabel>
                            <MainSendingFormInput
                                placeholder="someone@email.com"
                                id="email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                value={email}
                            ></MainSendingFormInput>
                        </InputContainer>
                        <InputContainer>
                            <MainSendingFormLabel htmlFor="recipient">
                                收件人:
                            </MainSendingFormLabel>
                            <MainSendingFormInput
                                placeholder="someone"
                                id="recipient"
                                onChange={(e) => {
                                    setRecipient(e.target.value);
                                }}
                                value={recipient}
                            ></MainSendingFormInput>
                        </InputContainer>
                        <InputContainer>
                            <MainSendingFormLabel htmlFor="sender">
                                寄件人:
                            </MainSendingFormLabel>
                            <MainSendingFormInput
                                placeholder="you"
                                id="sender"
                                onChange={(e) => {
                                    setSender(e.target.value);
                                }}
                                value={sender}
                            ></MainSendingFormInput>
                        </InputContainer>
                        <PreviewContainer>
                            <PreviewTitle>卡片預覽:</PreviewTitle>
                            <PreviewArea>
                                {selectedCard !== '' ? (
                                    <Card
                                        cardOpend={cardOpend}
                                        onClick={handleCardOpened}
                                        snapshot={rightInnerSnapshot}
                                    >
                                        <Cover cardOpend={cardOpend}>
                                            <RightContent
                                                snapshot={leftInnerSnapshot}
                                            ></RightContent>
                                            <LeftContent
                                                snapshot={coverSnapshot}
                                            ></LeftContent>
                                        </Cover>
                                    </Card>
                                ) : (
                                    <PreviewAreaEmtpyWarning>
                                        請先選擇卡片
                                    </PreviewAreaEmtpyWarning>
                                )}
                            </PreviewArea>
                        </PreviewContainer>
                        <SubmitBtn type="submit" value="確認寄信"></SubmitBtn>
                    </MainSendingForm>
                </MainSendingArea>
            </MainContainer>
        </>
    );
};

export default SendPage;
