import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { deleteIcon } from '../../../../../images/icons';
// import { fabric } from 'fabric';
const DeleteElementBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    color: white;
    background-color: #172f2f;
    border-radius: 4px;
    :hover {
        cursor: pointer;
        background-color: #996633;
    }
`;

const DeleteIcon = styled.img`
    width: 20px;
    filter: invert(100%) sepia(0%) saturate(100%) hue-rotate(100deg)
        brightness(100%) contrast(100%);
`;

const NavEdit = (props) => {
    const handleDeleteSelectedItem = () => {
        if (props.canvas.getActiveObject()) {
            props.canvas.remove(props.canvas.getActiveObject());
            props.canvas.discardActiveObject();
        }
    };

    return (
        <>
            <DeleteElementBtn onClick={handleDeleteSelectedItem}>
                <DeleteIcon src={deleteIcon} />
            </DeleteElementBtn>
        </>
    );
};

export default NavEdit;
