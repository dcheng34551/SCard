import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import DrawingArea from './EditArea/DrawingArea';
import Sidebar from './EditArea/Sidebar';
import NavText from './EditArea/ElementSelection/NavText';

import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    width: 100%;
`;

const DrawingContainer = styled.div`
    width: 100%;
    background-color: gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const DrawingElementAdjustmentContainer = styled.div`
    width: 100%;
    display: flex;
`;

const EditPage = () => {
    const [canvas, setCanvas] = useState({});

    useEffect(() => {
        const canvasInit = new fabric.Canvas('c', {
            backgroundColor: '#fff',
            width: 500,
            height: 500,
        });
        setCanvas(canvasInit);
    }, []);

    return (
        <Container>
            <Sidebar canvas={canvas} />
            <DrawingContainer>
                <DrawingElementAdjustmentContainer>
                    <NavText canvas={canvas} />
                </DrawingElementAdjustmentContainer>
                <DrawingArea canvas={canvas} />
            </DrawingContainer>
        </Container>
    );
};

export default EditPage;
