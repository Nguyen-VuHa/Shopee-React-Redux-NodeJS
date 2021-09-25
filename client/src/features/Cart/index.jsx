import $ from 'jquery';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './cart.scss';
import { getProductInCarts } from './cartSlice';
import ContentCart from './components/ContentCart';
import FooterCart from './components/FooterCart';
import HeaderCart from './components/HeaderCart';

const Cart = (props) => {
    const { handleCart, isShowModal, setModalCart} = props;
    const accessToken = localStorage.getItem('accessToken');
    const dispatch = useDispatch();
 
    useEffect(() => {
        if(accessToken) {
            const action = getProductInCarts(accessToken);
            dispatch(action);
        }
    }, [dispatch, isShowModal]);

    
    const handleClickImage = () => {
        $('.md').removeClass('animated');
        setModalCart(!isShowModal);
    }

   

    return (
        <div className={isShowModal ? "md animated": "md"}>
            <div className="modal-cart" onClick={ handleCart }>
            </div>
            <div className="mini-cart">
                <HeaderCart handleCart={handleCart}/>
                <ContentCart handleClickImage={handleClickImage} isShowModal={isShowModal} />
                <FooterCart />
            </div>
        </div>
    );
};


export default Cart;
