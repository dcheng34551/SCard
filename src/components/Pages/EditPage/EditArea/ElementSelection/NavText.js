import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';
// import 'fontfaceobserver';
// import { fabric } from 'fabric';

const TextAdjustmentContainer = styled.div`
    display: flex;
    align-items: center;
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
    border-radius: 4px;
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
    const textFonts = ['JetBrains Mono', 'Raleway', 'Montserrat Alternates'];

    const changeTextFont = (e) => {
        if (props.canvas.getActiveObject()) {
            props.canvas.getActiveObject().set({ fontFamily: e.target.value });
            props.canvas.requestRenderAll();
        }
    };

    const changeTextSize = (e) => {
        if (props.canvas.getActiveObject()) {
            props.canvas.getActiveObject().fontSize = parseInt(e.target.value);
            props.canvas.requestRenderAll();
        }
    };

    const chosenColorRef = useRef(null);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [chosenColor, setChosenColor] = useState({
        background: {
            r: '0',
            g: '0',
            b: '0',
            a: '1',
        },
    });

    const trackOutSideClick = (trackTargetNode, callback) => {
        const clickedOrNot = (e) => {
            if (!trackTargetNode.contains(e.target)) {
                callback();
                document.removeEventListener('click', clickedOrNot, true);
            }
        };
        document.addEventListener('click', clickedOrNot, true);
    };

    const toggleColorPicker = (e) => {
        setShowColorPicker(true);
        if (chosenColorRef.current.style) {
            chosenColorRef.current.style.zIndex = '2';
            trackOutSideClick(e.currentTarget.parentNode, () => {
                setShowColorPicker(false);
                chosenColorRef.current.style.zIndex = '1';
            });
        }
    };

    const changeTextColor = (color) => {
        if (props.canvas.getActiveObject()) {
            const colorRgba = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
            setChosenColor({ background: colorRgba });
            props.canvas.getActiveObject().set('fill', colorRgba);
            props.canvas.requestRenderAll();
        }
    };

    // const handleShowColorPicker = () => {
    //     setShowColorPicker(!showColorPicker);
    // };

    return (
        <TextAdjustmentContainer>
            <TextSelectSize onChange={changeTextSize}>
                {textSize.map((size, index) => (
                    <option key={index}>{size}</option>
                ))}
            </TextSelectSize>
            <TextSelectFont value="預設" onChange={changeTextFont}>
                {textFonts.map((font, index) => (
                    <option key={index} value={font}>
                        {font}
                    </option>
                ))}
            </TextSelectFont>
            <TextSelectColor
                ref={chosenColorRef}
                color={chosenColor}
                style={{ backgroundColor: chosenColor.background }}
                onClick={toggleColorPicker}
            >
                {showColorPicker ? (
                    <ChromePicker
                        // style={{ position: 'absolute', top: '20px' }}
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
