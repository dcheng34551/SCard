import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { logo } from '../../../images/index';
import {
    getAllSnapshots,
    navToEditCard,
    navToSendCard,
    getCardUser,
} from '../../../Utils/firebase';
import { backIcon, mailIcon } from '../../../images/icons';

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

const ActionContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 30px;
`;

const EditBtn = styled.button`
    height: 24px;
    width: 90px;
    background-color: #172f2f;
    border: none;
    border-radius: 4px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-right: 20px;
    line-height: 0.9;
    font-size: 14px;
    :hover {
        cursor: pointer;
        background-color: #996633;
        border: 1px solid #996633;
    }
`;

const SendBtn = styled.button`
    height: 24px;
    width: 60px;
    background-color: #172f2f;
    border: none;
    border-radius: 4px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
    line-height: 0.9;
    font-size: 14px;
    :hover {
        cursor: pointer;
        background-color: #996633;
        border: 1px solid #996633;
    }
`;

const WhiteBtn = styled.img`
    width: 16px;
    filter: invert(100%) sepia(0%) saturate(100%) hue-rotate(100deg)
        brightness(100%) contrast(100%);
`;

const Body = styled.div`
    margin-top: 80px;
    width: 100vw;
    height: calc(100vh - 80px);
    background-color: #f9f2ec;
    box-shadow: inset 0 0 10px #b6b6b6;
    position: relative;
`;

const Card = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: ${(props) =>
        props.cardOpend ? 'translate(0, -50%)' : 'translate(-50%, -50%)'};
    width: 400px;
    height: 600px;
    /* background-image: url('https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80'); */
    background-image: ${(props) => `url('${props.snapshot}')`};
    background-size: cover;
    background-position: center;
    perspective: 3000px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
    transition: 0.5s;

    :hover {
        cursor: pointer;
    }
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

const ShowPage = (props) => {
    const [cardId, setCardId] = useState('');
    const [cardOpend, setCardOpened] = useState(false);
    const [coverSnapshot, setCoverSnapshot] = useState('');
    const [leftInnerSnapshot, setLeftInnerSnapshot] = useState('');
    const [rightInnerSnapshot, setRightInnerSnapshot] = useState('');
    const [cardAuthor, setCardAuthor] = useState('');

    const handleCardOpened = () => {
        setCardOpened(!cardOpend);
    };

    const handleNavToEditCard = () => {
        navToEditCard(cardId);
    };

    const handleNavToSendCard = () => {
        navToSendCard(props.currentUser.email);
    };

    useEffect(() => {
        setCardId(props.match.params.cardId);
        getCardUser(props.match.params.cardId, setCardAuthor);
    }, []);

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
                <LogoAnchor href={`/main/${props.currentUser.email}`}>
                    <Logo src={logo} />
                </LogoAnchor>
                {props.currentUser.email &&
                props.currentUser.email !== 'noUser' ? (
                    <ActionContainer>
                        {cardAuthor === props.currentUser.email ? (
                            <>
                                <EditBtn onClick={handleNavToEditCard}>
                                    <WhiteBtn src={backIcon} />
                                    繼續編輯
                                </EditBtn>
                                <SendBtn onClick={handleNavToSendCard}>
                                    <WhiteBtn src={mailIcon} />
                                    寄信
                                </SendBtn>
                            </>
                        ) : null}
                    </ActionContainer>
                ) : null}
            </Nav>
            <Body>
                <Card
                    cardOpend={cardOpend}
                    onClick={handleCardOpened}
                    snapshot={rightInnerSnapshot}
                >
                    <Cover cardOpend={cardOpend}>
                        <RightContent
                            snapshot={leftInnerSnapshot}
                        ></RightContent>
                        <LeftContent snapshot={coverSnapshot}></LeftContent>
                    </Cover>
                </Card>
            </Body>
        </>
    );
};

export default ShowPage;
