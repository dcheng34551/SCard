import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';
import 'fontfaceobserver';
// import { fabric } from 'fabric';

const TextAdjustmentContainer = styled.div`
    display: flex;
`;
const TextSelectSize = styled.select`
    height: 20px;
`;

const TextSelectFont = styled.select`
    height: 20px;
`;

const TextSelectColor = styled.div`
    width: 20px;
    height: 20px;
    background-color: ${(props) => props.color};
`;

const NavText = (props) => {
    const textSize = [6, 8, 10, 12, 14, 16, 18, 20, 24, 36, 48, 72];
    const textFonts = [
        'Roboto',
        'JetBrains Mono',
        'Raleway',
        'Montserrat Alternates',
    ];

    const [showColorPicker, setShowColorPicker] = useState(false);
    const [chosenColor, setChosenColor] = useState('rgba(255, 255, 255, 1)');
    //set textFont
    // const preloadFont = () => {
    //     const FontFaceObserver = require('fontfaceobserver');
    //     textFonts.map((font) => console.log(font));
    //     Promise.all(textFonts.map((font) => new FontFaceObserver(font).load()))
    //         .then(() => {})
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    // useEffect(() => {
    //     preloadFont();
    // }, []);

    const changeTextFont = (e) => {
        if (props.canvas.getActiveObject()) {
            console.log(e.target.value);
            props.canvas.getActiveObject().set('fontFamily', e.target.value);
            props.canvas.requestRenderAll();
        }
    };

    const changeTextSize = (e) => {
        if (props.canvas.getActiveObject()) {
            props.canvas.getActiveObject().fontSize = parseInt(e.target.value);
            props.canvas.requestRenderAll();
        }
    };

    const changeTextColor = (color) => {
        console.log(color.rgb);
        if (props.canvas.getActiveObject()) {
            setChosenColor(
                `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
            );
            props.canvas.getActiveObject().set('fill', chosenColor);
            props.canvas.requestRenderAll();
        }
    };

    const handleShowColorPicker = () => {
        setShowColorPicker(!showColorPicker);
    };
    return (
        <TextAdjustmentContainer>
            <TextSelectSize onChange={changeTextSize}>
                {textSize.map((size, index) => (
                    <option key={index}>{size}</option>
                ))}
            </TextSelectSize>
            <TextSelectFont onChange={changeTextFont}>
                {textFonts.map((font, index) => (
                    <option key={index} value={font}>
                        {font}
                    </option>
                ))}
            </TextSelectFont>
            <TextSelectColor
                color={chosenColor}
                onClick={handleShowColorPicker}
            ></TextSelectColor>
            {showColorPicker ? (
                <ChromePicker onChange={changeTextColor}></ChromePicker>
            ) : null}
        </TextAdjustmentContainer>
    );
};

export default NavText;
