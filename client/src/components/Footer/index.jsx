import React from 'react';
import { Container } from 'reactstrap';
import './footer.scss';


const Footer = () => {
    return (
        <div className="footer">
            <Container>
                <div className="footer-item">
                    <div className="footer-logo">
                        <a className="logo" href="http://localhost:3000/">
                            BIBI Korea
                        </a>
                    </div>
                    <div className="footer-sales">
                        ...
                    </div>
                </div>
                <div className="footer-item">
                    <div className="menu">
                        <div className="menu-item">Trang Chủ</div>
                        <div className="menu-item">Sản Phẩm</div>
                        <div className="menu-item">Our Story</div>
                        <div className="menu-item">Our Craft</div>
                        <div className="menu-item">Liên Hệ</div>
                    </div>
                </div>
                <div className="footer-item">
                    <div className="menu">
                        <div className="menu-item">Facebook</div>
                        <div className="menu-item">Instagram</div>
                        <div className="menu-item">Printest</div>
                        <div className="menu-item">
                            <a href="https://shopee.vn/havu_authentic">Shoppee</a>
                        </div>
                    </div>
                </div>
                <div className="footer-item"></div>
            </Container>
        </div>
    );
};


Footer.propTypes = {

};


export default Footer;
