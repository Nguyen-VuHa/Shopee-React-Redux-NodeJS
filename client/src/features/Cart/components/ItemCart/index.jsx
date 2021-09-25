import { getProductInCarts, minusCarts, plusCarts, removeCarts } from 'features/Cart/cartSlice';
import { minusTotalPrice, plusTotalPrice } from 'features/Cart/totalPriceSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const ItemCart = (props) => {
    const { data, handleClickImage } = props;
    const [countProduct, setcountProduct] = useState(data.countProduct);
    const accessToken = localStorage.getItem('accessToken');
    const dispatch = useDispatch();

    const handleMinusCount = () => {
        if(accessToken) {
            if(countProduct > 1)
            {
                setcountProduct(countProduct - 1);
                const action = minusCarts({
                    accessToken,
                    idCarts: data.id
                });
                dispatch(action);
                const actionPlusTotal = minusTotalPrice(data.SANPHAM.price);
                dispatch(actionPlusTotal);  
            }
        }
    }

    const handlePlusCount = () => {
        if(accessToken) {
            setcountProduct(countProduct + 1);
            const action = plusCarts({
                accessToken,
                idCarts: data.id
            });
            dispatch(action);
            const actionPlusTotal = plusTotalPrice(data.SANPHAM.price);
            dispatch(actionPlusTotal);
        }
    }
    
    const handleRemoveItem = () => {
        if(accessToken) { 
            const action = removeCarts({
                accessToken,
                idCarts: data.id
            });
            dispatch(action);
            const actionPlusTotal = plusTotalPrice(data.SANPHAM.price * countProduct);
            dispatch(actionPlusTotal);
        }
    }

    return (
        <div className="cart-item" >
            <div 
                className="image-pd" 
                onClick={handleClickImage}
            >
                <Link to={`/product-page/${data.SANPHAM.nameProduct.replaceAll(' ', '-')}`}>
                    <img src={data.SANPHAM.imageUrl} alt="NotImage"/>
                </Link>
            </div>
            <div className="content-pd">
                <div className="name-pd">{data.SANPHAM.nameProduct}</div>
                <div className="price-pd">{data.SANPHAM.price.toLocaleString()} đ</div>
                <div className="group-btn-count">
                    <div className="btn-minus">
                        <i 
                            className={countProduct > 1 ? "fal fa-minus" : "fal fa-minus hide"}
                            onClick={() => handleMinusCount()}
                        ></i>
                        </div>
                    <div className="btn-plus">
                        <i 
                            className="fal fa-plus"
                            onClick={() => handlePlusCount()}
                        ></i>
                    </div>
                    <span>{countProduct}</span>
                </div>
            </div>
            <div 
                className="btn-remove" 
                onClick={() => handleRemoveItem()}
            >
                <i className="fal fa-times"></i>
            </div>
        </div>
    );
};


ItemCart.propTypes = {

};


export default ItemCart;
