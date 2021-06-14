import React from 'react';
import Header from '../../Header';
import styled from 'styled-components';

const Body = styled.div`
    width: 100%;
    height: 100vh;
    background-color: gray;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const UndefinedPage = () => {
    return (
        <>
            <Header></Header>
            <Body>
                <div style={{ fontSize: '72px' }}>404</div>
                <div style={{ fontSize: '24px' }}>此頁不存在...</div>
            </Body>
        </>
    );
};

export default UndefinedPage;
