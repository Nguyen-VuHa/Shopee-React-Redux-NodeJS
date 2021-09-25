import React from 'react';
import { useSelector } from 'react-redux';


const FooterCart = () => {
    const stateCart = useSelector((state) => state.carts);
    const stateTotalPrice = useSelector((state) => state.totalPriceCart);

    return (
        <div>
            {stateCart.listCart.length > 0 ?  
                <>
                    <div className="cart-subtotal">
                        <div className="cart-subtotal__title">Tổng tiền thanh toán</div>
                        <div className="cart-subtotal__price">{stateTotalPrice.toLocaleString()} đ</div>
                    </div>
                    <div className="cart-btn-view">
                        <div className="btn btn-view-cart">Xem Giỏ Hàng</div>
                    </div>
                </>
                : ''}
        </div>
    );
};


FooterCart.propTypes = {

};


export default FooterCart;
