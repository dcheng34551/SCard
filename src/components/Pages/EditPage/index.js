import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import DrawingArea from './EditArea/DrawingArea';
import Sidebar from './EditArea/Sidebar';
import NavText from './EditArea/ElementSelection/NavText';
import SaveCard from './EditArea/ElementSelection/SaveCard';
import { loadCanvas } from '../../../Utils/firebase';
import { logo } from '../../../images/index';
import styled from 'styled-components';

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
`;

const DrawingElementAdjustmentContainer = styled.div`
    width: 100%;
    height: 60px;
    background: linear-gradient(90deg, #cc9966, #ae6f37);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DrawingElementAdjustmentContainerLeft = styled.div`
    width: 1220px;
    display: flex;
`;

const SavePreviewContainer = styled.div`
    width: 100%;
    height: 60px;
    background: linear-gradient(90deg, #cc9966, #ae6f37);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SavePreviewContainerLeft = styled.div`
    width: 1220px;
    display: flex;
`;

const EditPage = (props) => {
    const [canvas, setCanvas] = useState({});
    const [cardData, setCardData] = useState({});
    const [cardId, setCardId] = useState('');
    const [cover, setCover] = useState({});
    const [inner, setInner] = useState({});
    const [text, setText] = useState({});

    // const canvasInit = new fabric.Canvas('c', {
    //     backgroundColor: '#fff',
    //     width: 400,
    //     height: 600,
    // });

    // const innerCanvasInit = new fabric.Canvas('i', {
    //     backgroundColor: '#fff',
    //     width: 400,
    //     height: 600,
    // });

    useEffect(() => {
        //new
        loadCanvas(
            props.match.params.cardId,
            (
                coverDataInit,
                leftInnerDataInit,
                rightInnerDataInit,
                snapshotInit
            ) => {
                setCardData(coverDataInit);
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
                // console.log(cardDataInit);
            }
        );
        setCardId(props.match.params.cardId);
    }, []);

    useEffect(() => {
        // console.log(`this is ${cardId}`);
        if (cardId !== '') {
            loadCanvas(cardId, (cardDataInit, snapshotInit) => {
                console.log(cardDataInit);
                // console.log(snapshotInit);
            });
        }
    }, [cardId]);

    return (
        <>
            <Nav>
                <Logo src={logo} />
            </Nav>
            <Container>
                <Sidebar canvas={canvas} />
                <DrawingContainer>
                    <DrawingElementAdjustmentContainer>
                        <DrawingElementAdjustmentContainerLeft>
                            <NavText canvas={canvas} />
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
