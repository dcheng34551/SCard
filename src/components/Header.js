import React from 'react';
import styled from 'styled-components';
import { logo } from '../images/index';

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 80px;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
`;

const Logo = styled.img`
    width: 110px;
    margin-left: 30px;
`;

const Header = () => {
    return (
        <>
            <Nav>
                <Logo src={logo} />
            </Nav>
        </>
    );
};

export default Header;
