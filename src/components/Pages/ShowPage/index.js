import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { logo } from '../../../images/index';
import { getAllSnapshots } from '../../../Utils/firebase';

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

const Body = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #f3f3f3;
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

    const handleCardOpened = () => {
        setCardOpened(!cardOpend);
    };

    useEffect(() => {
        setCardId(props.match.params.cardId);
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
                <Logo src={logo}></Logo>
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
