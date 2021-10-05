import { closeCart } from 'features/Cart/isShowCartSlice';
import React from 'react';
import { useDispatch } from 'react-redux';


const HeaderCart = () => {
    const dispatch = useDispatch();

    const handleCloseCart = () => {
        const action = closeCart();
        dispatch(action);
    }
    
    return (
        <div className="md-cart">
            <div className="btn-md-close" onClick={() => handleCloseCart() }>
                <i className="far fa-chevron-left"></i>
            </div>
            <div className="title-cart">
                Giỏ hàng
            </div>
        </div>
    );
};


HeaderCart.propTypes = {

};


export default HeaderCart;
