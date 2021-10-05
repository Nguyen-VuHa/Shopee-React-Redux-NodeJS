import $ from 'jquery';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './cart.scss';
import { getProductInCarts } from './cartSlice';
import ContentCart from './components/ContentCart';
import FooterCart from './components/FooterCart';
import HeaderCart from './components/HeaderCart';
import { closeCart } from './isShowCartSlice';

const Cart = () => {
    const isShowCart = useSelector((state) => state.isShowCart);
    const accessToken = localStorage.getItem('accessToken');
    const dispatch = useDispatch();
 
    useEffect(() => {
        const action = getProductInCarts(accessToken);
        dispatch(action);
    }, [dispatch, isShowCart]);

    
    const handleClickImage = () => {
        $('.md').removeClass('animated');
        const action = closeCart();
        dispatch(action);
    }

    const handleCloseCart = () => {
        const action = closeCart();
        dispatch(action);
    }

    return (
        <div className={isShowCart ? "md animated": "md"}>
            <div 
                className="modal-cart" 
                onClick={() => handleCloseCart()}
            >
            </div>
            <div className="mini-cart">
                <HeaderCart />
                <ContentCart handleClickImage={handleClickImage} isShowModal={isShowCart} />
                <FooterCart />
            </div>
        </div>
    );
};


export default Cart;
