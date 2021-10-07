import { minusCarts, plusCarts, removeCarts } from 'features/Cart/cartSlice';
import { closeCart } from 'features/Cart/isShowCartSlice';
import { getProductById } from 'features/Product/productSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const ItemCart = (props) => {
    const { data } = props;
    const accessToken = localStorage.getItem('accessToken');
    const dispatch = useDispatch();
    const productById = useSelector(getProductById(data.Carts_idProduct));


    const handleMinusCount = () => {
        if(accessToken) {
            if(data.countProduct > 1)
            {
                const action = minusCarts({
                    accessToken,
                    idCarts: data.id,
                    countProduct: data.countProduct - 1,
                });
                dispatch(action);
            }
        }
    }

    const handlePlusCount = () => {
        if(accessToken) {
            const action = plusCarts({
                accessToken,
                idCarts: data.id,
                countProduct: data.countProduct + 1,
            });
            dispatch(action);
        }
    }
    
    const handleRemoveItem = () => {
        if(accessToken) { 
            const action = removeCarts({
                accessToken,
                idCarts: data.id
            });
            dispatch(action);
        }
    }

    const handleClickImage = () => {
        const action = closeCart();
        dispatch(action);
    }

    return (
        <div className="cart-item" >
            <div 
                className="image-pd" 
                onClick={handleClickImage}
            >
                <Link to={`/product-page/${productById?.nameProduct.replaceAll(' ', '-')}`}>
                    <img src={productById?.imageUrl} alt="NotImage"/>
                </Link>
            </div>
            <div className="content-pd">
                <div className="name-pd">{productById?.nameProduct}</div>
                <div className="price-pd">{productById?.price.toLocaleString()} đ</div>
                <div className="group-btn-count">
                    <div className="btn-minus">
                        <i 
                            className={data.countProduct > 1 ? "fal fa-minus" : "fal fa-minus hide"}
                            onClick={() => handleMinusCount()}
                        ></i>
                        </div>
                    <div className="btn-plus">
                        <i 
                            className="fal fa-plus"
                            onClick={() => handlePlusCount()}
                        ></i>
                    </div>
                    <span>{data.countProduct}</span>
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
