import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Notification from './components/HeaderNotify';
import './header.scss';
import Images from 'constants/images';
import { useDispatch, useSelector } from 'react-redux';
import { openCart } from 'features/Cart/isShowCartSlice';

const Header = (props) => {
    const { status, handleisLogout } = props;
    const stateCart = useSelector((state) => state.carts);
    const [listNotify, setlistNotify] = useState([]);
    let infoUser = JSON.parse(localStorage.getItem('info-user'));
    const dispath = useDispatch();

    useEffect(() => {
       $('.info-user').on('click', function(e) {
            const ousideClick = e.target.closest('.info-user .user-options');
            
            if(ousideClick) {
                return;
            }
            else {
                $('.info-user').toggleClass('active');
            }
       })

       $(window).on('click', function(e) {
           if(!e.target.closest('.info-user .user-options') && !e.target.closest('.info-user'))
           {
                $('.info-user').removeClass('active');
           }
           if(!e.target.closest('.content-noti') && !e.target.closest('.notification i'))
           {
                $('.content-noti').removeClass('active');
           }
       })
    }, []);

    const handleNotifyClick = (values) => {
        setlistNotify(values.payload.notifyData);
    }

    const handleLogout = () => {
        localStorage.clear();
        handleisLogout(false);
    }

    useEffect(() => {
        $('.menu-btn').on('click', function() {
            $('.container').addClass('show');
        })

        $('.close-tab').on('click', function() {
            $('.container').removeClass('show');
        })

        $('.item').on('click', function() {
            $('.container').removeClass('show');
        })
    }, []);

    const handleOpenCart = () => {
        const action = openCart();
        dispath(action);
    }
    
    return (
        <header className="header">
            <div className="header__top">
                <div className="grid-container">
                    <div className="grid-item">
                        <a className="header-logo" href="https://bibi-cosmetic-store.herokuapp.com/">
                            BIBI Korea
                        </a>
                    </div>
                    <div className="grid-item">
                        <form className="form__search">
                            <div className="search">
                                <div className="icon-search">
                                    <i className="fal fa-search"></i>
                                </div>
                                <div className="search-input">
                                    <input placeholder="Tìm kiếm..." />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="grid-item item-user">
                        <div className="menu-btn">
                            <i className="fal fa-bars"></i>
                        </div>
                        <div className="masthead">
                            {status ? <> 
                                <div className="info-user" >
                                    <div className="user-avartar">
                                        <img src={ infoUser.info.img ? infoUser.info.img : Images.BG_USER } alt="NotImage"/>
                                    </div>
                                    <div className="user-fullname" title={ status ? infoUser.info.fullname : '' }>
                                        <span>{ status ? infoUser.info.fullname : '' }</span>
                                    </div>
                                    <nav className="user-options">
                                            <ul>
                                                <li>
                                                    <Link to="#">Đơn hàng</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">Địa chỉ</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">Ví tiền</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">DS yêu thích</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">Tài khoản</Link>
                                                </li>
                                                <li className="item-line"><div></div></li>
                                                <li>
                                                    <Link onClick={handleLogout} to="#">Đăng xuất</Link>
                                                </li>
                                            </ul>
                                        </nav>
                                </div> 
                                <Notification handleNotifyClick={handleNotifyClick} listNotify={listNotify} />
                                <div className="header-cart">
                                    <div className="cart" >
                                        <i 
                                            className="far fa-shopping-cart" 
                                            onClick={() => handleOpenCart()}
                                        ></i>
                                        {stateCart.listCart.length > 0 ? 
                                            <span>{stateCart.listCart.length}</span>
                                         : ''}
                                            <div>Giỏ hàng</div>
                                    </div>
                                </div>
                            </>
                            :
                                <Link className="btn-login" to="/auth">
                                    <div className="icon-user">
                                        <i className="fas fa-user-circle"></i>
                                    </div>
                                    <span>Đăng nhập</span>
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="header__bottom">
                <div className="container">
                    <div className="close-tab">
                        <i className="fal fa-times-circle"></i>
                    </div>
                    <ul className="list-btn">
                        <li className="item">
                            <Link to="/">
                                Trang Chủ
                            </Link>
                        </li>
                        <li className="item">
                            <Link to="/shop-all">
                                Sản Phẩm
                            </Link>
                        </li>
                        <li className="item">
                            <Link to="#">
                                Our Story
                            </Link>
                        </li>
                        <li className="item">
                            <Link to="#">
                                Our Craft
                            </Link>
                        </li>
                        <li className="item">
                            <Link to="#">
                                Liên Hệ
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {

}

export default Header;
