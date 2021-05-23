import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';
import 'fontfaceobserver';
// import { fabric } from 'fabric';

const TextAdjustmentContainer = styled.div`
    display: flex;
`;
const TextSelectSize = styled.select``;

const TextSelectFont = styled.select``;

const NavText = (props) => {
    const textSize = [6, 8, 10, 12, 14, 16, 18, 20, 24, 36, 48, 72];
    const textFonts = [
        'Roboto',
        'JetBrains Mono',
        'Raleway',
        'Montserrat Alternates',
    ];
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
            const chosenColor = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
            props.canvas.getActiveObject().set('fill', chosenColor);
            props.canvas.requestRenderAll();
        }
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
            <ChromePicker onChange={changeTextColor}></ChromePicker>
        </TextAdjustmentContainer>
    );
};

export default NavText;
