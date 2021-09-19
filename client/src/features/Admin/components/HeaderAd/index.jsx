import React from 'react';
import { Container } from 'reactstrap';
import AccountMenu from './components/AccountMenu';
import './header-ad.scss';

const Header = () => {
    return (
        <header className="ad-header">
            <Container>
                <div className="ad-header__logo">
                    <span>ADMIN MANAGER</span>
                </div>
                <div className="ad-header__menu">
                    <AccountMenu />
                </div>
            </Container>
        </header>
    );
};


Header.propTypes = {

};


export default Header;
