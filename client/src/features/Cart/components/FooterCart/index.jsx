import { cartSelectors } from 'features/Cart/cartSlice';
import { productViewSelectors } from 'features/Product/productSlice';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const FooterCart = () => {
    const [totalPrice, settotalPrice] = useState(0);
    const stateCart = useSelector(cartSelectors.selectAll);
    const stateProduct = useSelector(productViewSelectors.selectAll);

    useEffect(() => {
        var total = 0;
        if(stateCart.length > 0){
            stateCart.forEach(item => {
                var productById = stateProduct.filter(p => p.idProduct === item.Carts_idProduct);
                total += (item.countProduct * productById[0]?.price);
            })
            settotalPrice(total);
        }
    }, [stateCart, stateProduct]);

    return (
        <div>
            { stateCart.length > 0 ?  
                <>
                    <div className="cart-subtotal">
                        <div className="cart-subtotal__title">Tổng tiền thanh toán</div>
                        <div className="cart-subtotal__price">{ totalPrice.toLocaleString() } đ</div>
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
