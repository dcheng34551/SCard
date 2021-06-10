import React from 'react';
import styled from 'styled-components';
import {
    saveDataUrl,
    navToPreviewCard,
    navToSendCard,
} from '../../../../../Utils/firebase';

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const ActionContainer = styled.div`
    display: flex;
`;

const SaveBtn = styled.button`
    height: 30px;
    width: 60px;
    background-color: #172f2f;
    border: none;
    border-radius: 4px;
    color: white;
    margin-right: 20px;
    line-height: 0.9;
    font-size: 14px;
    :hover {
        background-color: rgba(23, 47, 47, 0.8);
        cursor: pointer;
        box-shadow: 0 0 5px #172f2f;
    }
`;

const PreviewBtn = styled.button`
    height: 30px;
    width: 60px;
    background-color: #172f2f;
    border: none;
    border-radius: 4px;
    color: white;
    margin-right: 20px;
    line-height: 0.9;
    font-size: 14px;
    :hover {
        background-color: rgba(23, 47, 47, 0.8);
        cursor: pointer;
        box-shadow: 0 0 5px #172f2f;
    }
`;

const SendBtn = styled.button`
    height: 30px;
    width: 60px;
    background-color: #172f2f;
    border: none;
    border-radius: 4px;
    color: white;
    line-height: 0.9;
    font-size: 14px;
    :hover {
        background-color: rgba(23, 47, 47, 0.8);
        cursor: pointer;
        box-shadow: 0 0 5px #172f2f;
    }
`;

const ChangeCanvasContainer = styled.div`
    display: flex;
`;

const ChangeCanvasBtn = styled.button`
    height: 30px;
    width: 60px;
    background-color: #172f2f;
    border: none;
    border-radius: 4px;
    color: white;
    margin-right: 20px;
    line-height: 0.9;
    font-size: 14px;
    :hover {
        background-color: rgba(23, 47, 47, 0.8);
        cursor: pointer;
        box-shadow: 0 0 5px #172f2f;
    }
`;

const SaveCard = (props) => {
    const handleSaveCard = () => {
        saveDataUrl(props.cover, props.inner, props.text, props.cardId);
    };

    const handlePreview = () => {
        // console.log(props.cardId);
        navToPreviewCard(props.cardId);
    };

    const handleNavToSendCard = () => {
        // console.log(props.currentUser);
        navToSendCard(props.currentUser.email);
    };

    const handleCanvasChange = (e) => {
        if (e.target.dataset.canvas === 'inner') {
            props.setCanvas(props.inner);
        } else if (e.target.dataset.canvas === 'cover') {
            props.setCanvas(props.cover);
        } else if (e.target.dataset.canvas === 'text') {
            props.setCanvas(props.text);
        }
    };

    return (
        <Container>
            <ChangeCanvasContainer>
                <ChangeCanvasBtn
                    data-canvas="cover"
                    onClick={handleCanvasChange}
                >
                    封面
                </ChangeCanvasBtn>
                <ChangeCanvasBtn
                    data-canvas="inner"
                    onClick={handleCanvasChange}
                >
                    內頁
                </ChangeCanvasBtn>
                <ChangeCanvasBtn
                    data-canvas="text"
                    onClick={handleCanvasChange}
                >
                    文字頁
                </ChangeCanvasBtn>
            </ChangeCanvasContainer>
            <ActionContainer>
                <SaveBtn onClick={handleSaveCard}>儲存</SaveBtn>
                <PreviewBtn onClick={handlePreview}>預覽</PreviewBtn>
                <SendBtn onClick={handleNavToSendCard}>寄信</SendBtn>
            </ActionContainer>
        </Container>
    );
};

export default SaveCard;
