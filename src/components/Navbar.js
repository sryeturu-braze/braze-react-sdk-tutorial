import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import mainLogo from '../assets/Braze-Logotype_White.png';

function Navbar() {
    return (
        <NavbarNav>
            <NavContainer>
                <LogoLink to='/'>
                    <Logo src={mainLogo} />
                </LogoLink>
                <NavMenu>
                    <NavItem>
                        <NavLink to='/'>User</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='/contentcards'>Content Cards</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='/bannercards'>Banner Cards</NavLink>
                    </NavItem>
                </NavMenu>
            </NavContainer>
        </NavbarNav>
    );
}

const NavbarNav = styled.nav`
    background: linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(26, 23, 23) 100%);
    height: 80px;
    font-size: 1.2rem;
    position: sticky;
    top: 0;
    z-index: 999;
`;

const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
    height: 80px;
    max-width: 1500px;
`;

const LogoLink = styled(Link)`
    color: #fff;
    margin-left: 20px;
    cursor: pointer;
    text-decoration: none;
    font-size: 2rem;
    display: flex;
    align-items: center;
`;

const Logo = styled.img`
    height: 40px;
    width: 80px;
    margin-top: 10px;
`;

const NavMenu = styled.div`
    display: flex;
    flex-direction: row;
`;

const NavItem = styled.div`
    height: 80px;
`;

const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    margin: 8px 16px;
    height: 100%;

    &:hover {
        color: grey
    }
`;


export default Navbar;