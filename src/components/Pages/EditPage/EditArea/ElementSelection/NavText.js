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
    margin-right: 20px;
`;

const TextSelectFont = styled.select`
    height: 20px;
    margin-right: 20px;
`;

const TextSelectColor = styled.div`
    width: 20px;
    height: 20px;
    position: relative;
    background-color: ${(props) =>
        `rgba(
            ${props.color.background.r},
            ${props.color.background.g},
            ${props.color.background.b},
            ${props.color.background.a}
        )`};
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
    // const [chosenColor, setChosenColor] = useState('rgba(255, 255, 255, 1)');
    const [chosenColor, setChosenColor] = useState({
        background: {
            r: '0',
            g: '0',
            b: '0',
            a: '1',
        },
    });
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
            const colorRgba = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
            setChosenColor({ background: colorRgba });
            props.canvas.getActiveObject().set('fill', colorRgba);
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
            >
                {showColorPicker ? (
                    <ChromePicker
                        style={{ position: 'absolute', zIndex: 5 }}
                        color={chosenColor.background}
                        className="originalColorPicker"
                        onChange={changeTextColor}
                    ></ChromePicker>
                ) : null}
            </TextSelectColor>
        </TextAdjustmentContainer>
    );
};

export default NavText;
