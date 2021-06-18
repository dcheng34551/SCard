import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import DrawingArea from './EditArea/DrawingArea';
import Sidebar from './EditArea/Sidebar';
import NavText from './EditArea/ElementSelection/NavText';
import NavEdit from './EditArea/ElementSelection/NavEdit';
import SaveCard from './EditArea/ElementSelection/SaveCard';
import {
    loadCanvas,
    changeCardName,
    saveDataUrl,
    navToPreviewCard,
    navToSendCard,
    saveAsTemplate,
} from '../../../Utils/firebase';
import { logo } from '../../../images/index';
import styled from 'styled-components';
import {
    viewIcon,
    saveIcon,
    mailIcon,
    editIcon,
    templateIcon,
} from '../../../images/icons';

const Nav = styled.nav`
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    width: 100vw;
    height: 80px;
    align-items: center;
    background-color: white;
`;

const LogoAnchor = styled.a`
    width: 110px;
    margin-left: 30px;
`;

const Logo = styled.img`
    width: 100%;
`;

const CardNameForm = styled.form`
    width: 300px;
    height: 30px;
    margin-left: 40px;
    display: flex;
    align-items: center;
`;

const CardName = styled.input`
    width: 150px;
    height: 24px;
    font-size: 16px;
    text-indent: 8px;
    border: 1px solid #a1a1a1;
    border-radius: 4px;

    :focus {
        border: 1px solid red;
    }
`;

const CardNameSubmitBtn = styled.button`
    width: 100px;
    margin-left: 20px;
    border: none;
    border-radius: 4px;
    height: 24px;
    background-color: #172a2a;
    border: 1px solid #172a2a;
    color: white;
    display: flex;
    align-items: center;
    line-height: 1.6;
    justify-content: space-around;
    font-size: 14px;

    :hover {
        cursor: pointer;
        background-color: #996633;
        border: 1px solid #996633;
    }
`;

const ActionContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 30px;
`;

const SaveBtn = styled.button`
    height: 24px;
    width: 60px;
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

const ToTemplateBtn = styled.button`
    height: 24px;
    width: 100px;
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

const PreviewBtn = styled.button`
    height: 24px;
    width: 60px;
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

const Container = styled.div`
    display: flex;
    width: 100%;
`;

const DrawingContainer = styled.div`
    width: 100%;
    margin-top: 80px;
    height: calc(100vh - 80px);
    background-color: #f9f2ec;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-shadow: inset 0 0 10px #b6b6b6;
`;

const DrawingElementAdjustmentContainer = styled.div`
    width: 100%;
    height: 60px;
    /* background: linear-gradient(90deg, #cc9966, #ae6f37); */
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DrawingElementAdjustmentContainerLeft = styled.div`
    width: 1220px;
    display: flex;
    justify-content: space-between;
`;

const SavePreviewContainer = styled.div`
    width: 100%;
    height: 60px;
    /* background: linear-gradient(90deg, #cc9966, #ae6f37); */
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SavePreviewContainerLeft = styled.div`
    /* width: 1220px; */
    display: flex;
    justify-content: center;
`;

const EditPage = (props) => {
    const [canvas, setCanvas] = useState({});
    // const [cardData, setCardData] = useState({});
    const [cardId, setCardId] = useState('');
    const [cover, setCover] = useState({});
    const [inner, setInner] = useState({});
    const [text, setText] = useState({});
    const [cardName, setCardName] = useState('未命名卡片');

    useEffect(() => {
        //new
        loadCanvas(
            props.match.params.cardId,
            (
                coverDataInit,
                leftInnerDataInit,
                rightInnerDataInit,
                snapshotInit,
                cardNameInit
            ) => {
                // setCardData(coverDataInit);
                const canvasInit = new fabric.Canvas('c', {
                    backgroundColor: '#fff',
                    width: 400,
                    height: 600,
                });
                const innerCanvasInit = new fabric.Canvas('i', {
                    backgroundColor: '#fff',
                    width: 400,
                    height: 600,
                });
                const innerCanvasTextInit = new fabric.Canvas('t', {
                    backgroundColor: '#fff',
                    width: 400,
                    height: 600,
                });
                canvasInit.offHistory();
                canvasInit.loadFromJSON(coverDataInit, presetCoverData);
                async function presetCoverData() {
                    await canvasInit.renderAll();
                    canvasInit.onHistory();
                    canvasInit.clearHistory();
                }
                innerCanvasInit.offHistory();
                innerCanvasInit.loadFromJSON(
                    leftInnerDataInit,
                    presetLeftInnerData
                );
                async function presetLeftInnerData() {
                    await innerCanvasInit.renderAll();
                    innerCanvasInit.onHistory();
                    innerCanvasInit.clearHistory();
                }
                innerCanvasTextInit.offHistory();
                innerCanvasTextInit.loadFromJSON(
                    rightInnerDataInit,
                    presetRightInnerData
                );
                async function presetRightInnerData() {
                    await innerCanvasTextInit.renderAll();
                    innerCanvasTextInit.onHistory();
                    innerCanvasTextInit.clearHistory();
                }
                setCover(canvasInit);
                setInner(innerCanvasInit);
                setText(innerCanvasTextInit);
                setCanvas(canvasInit);
                setCardName(cardNameInit);
                // console.log(cardDataInit);
            }
        );
        setCardId(props.match.params.cardId);
    }, []);

    // useEffect(() => {
    //     // console.log(`this is ${cardId}`);
    //     console.log('this');
    //     if (cardId !== '') {
    //         loadCanvas(cardId, (cardDataInit, snapshotInit) => {
    //             console.log(cardDataInit);
    //         });
    //     }
    // }, [cardId]);
    const handleCardNameChange = (e) => {
        e.preventDefault();
        changeCardName(props.currentUser.email, cardId, cardName);
    };

    const handleSaveCard = () => {
        saveDataUrl(cover, inner, text, cardId);
    };

    const handlePreview = () => {
        navToPreviewCard(cardId);
    };

    const handleNavToSendCard = () => {
        navToSendCard(props.currentUser.email);
    };

    const handleSaveAsTemplate = () => {
        saveAsTemplate(cardId);
    };

    return (
        <>
            <Nav>
                <LogoAnchor href={`/main/${props.currentUser.email}`}>
                    <Logo src={logo} />
                </LogoAnchor>
                <CardNameForm onSubmit={handleCardNameChange}>
                    <CardName
                        value={cardName}
                        onChange={(e) => {
                            setCardName(e.target.value);
                        }}
                    ></CardName>
                    <CardNameSubmitBtn>
                        <WhiteBtn src={editIcon} />
                        更改名字
                    </CardNameSubmitBtn>
                </CardNameForm>
                <ActionContainer>
                    <SaveBtn onClick={handleSaveCard}>
                        <WhiteBtn src={saveIcon} />
                        儲存
                    </SaveBtn>
                    <ToTemplateBtn onClick={handleSaveAsTemplate}>
                        <WhiteBtn src={templateIcon} />
                        儲存為範本
                    </ToTemplateBtn>
                    <PreviewBtn onClick={handlePreview}>
                        <WhiteBtn src={viewIcon} />
                        預覽
                    </PreviewBtn>
                    <SendBtn onClick={handleNavToSendCard}>
                        <WhiteBtn src={mailIcon} />
                        寄信
                    </SendBtn>
                </ActionContainer>
            </Nav>
            <Container>
                <Sidebar canvas={canvas} currentUser={props.currentUser} />
                <DrawingContainer>
                    <DrawingElementAdjustmentContainer>
                        <DrawingElementAdjustmentContainerLeft>
                            <NavText canvas={canvas} />
                            <NavEdit canvas={canvas} />
                        </DrawingElementAdjustmentContainerLeft>
                    </DrawingElementAdjustmentContainer>
                    <DrawingArea
                        canvas={canvas}
                        setCanvas={setCanvas}
                        cover={cover}
                        inner={inner}
                        text={text}
                    />
                    <SavePreviewContainer>
                        <SavePreviewContainerLeft>
                            <SaveCard
                                cover={cover}
                                inner={inner}
                                text={text}
                                canvas={canvas}
                                setCanvas={setCanvas}
                                cardId={cardId}
                                currentUser={props.currentUser}
                            />
                        </SavePreviewContainerLeft>
                    </SavePreviewContainer>
                </DrawingContainer>
            </Container>
        </>
    );
};

export default EditPage;
