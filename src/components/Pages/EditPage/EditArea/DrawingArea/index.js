import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { fabric } from 'fabric';
import 'fabric-history';

const CanvasContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const CanvasForTagContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const CanvasTag = styled.div`
    display: flex;
    width: 100px;
    height: 20px;
    background-color: black;
    color: white;
    justify-content: center;
    margin-bottom: 5px;
    border-radius: 2px;
    align-self: flex-end;
`;

const DrawingArea = (props) => {
    // const [currentCanvas, setCurrentCanvas] = useState('');

    // useEffect(() => {
    //     if (JSON.stringify(props.canvas) !== '{}') {
    //         setCurrentCanvas(props.canvas.lowerCanvasEl.id);
    //         console.log(props.canvas.lowerCanvasEl.id);
    //     }
    // }, [props.canvas]);

    // console.log(currentCanvas);

    // useEffect(() => {

    // })
    // if (!props.canvas.lowerCanvasEl) {

    // }
    return (
        <CanvasContainer>
            <CanvasForTagContainer>
                {/* {props.canvas.lowerCanvasEl &&
                props.canvas.lowerCanvasEl.id === 'c' ? (
                    <CanvasTag>正在編輯封面</CanvasTag>
                ) : (
                    ''
                )} */}
                <canvas
                    style={{ border: '1px solid gray', borderRadius: '5px' }}
                    id="c"
                />
            </CanvasForTagContainer>
            <CanvasForTagContainer>
                {/* {currentCanvas === 'i' ? (
                    <CanvasTag>正在編輯內頁</CanvasTag>
                ) : null} */}
                <canvas
                    style={{ border: '1px solid gray', borderRadius: '5px' }}
                    id="i"
                />
            </CanvasForTagContainer>
            <CanvasForTagContainer>
                {/* {currentCanvas === 'i' ? (
                    <CanvasTag>正在編輯內頁</CanvasTag>
                ) : null} */}
                <canvas
                    style={{ border: '1px solid gray', borderRadius: '5px' }}
                    id="t"
                />
            </CanvasForTagContainer>
        </CanvasContainer>
    );
};

export default DrawingArea;
