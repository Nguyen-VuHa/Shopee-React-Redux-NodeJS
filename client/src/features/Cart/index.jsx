import $ from 'jquery';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import './cart.scss';
import { getCarts, minusCarts, plusCarts, removeCarts } from './cartSlice';

const Cart = (props) => {
    const { handleCart, isShowModal, setModalCart} = props;
    const [listCart, setlistCart] = useState([]);
    const [totalPrice, settotalPrice] = useState(0);
    const dispath = useDispatch();
    const accessToken = localStorage.getItem('accessToken');


    function SubTotal(listData) {
        var total = 0;
        listData.forEach(item => {
            total += (item.SANPHAM.price * item.countProduct);
        })
        
        return total;
    }
 
    useEffect(() => {
       
        if(accessToken) {
            const getListCart = async () => {
                const data = await dispath(getCarts(accessToken));
                setlistCart(data.payload);

                settotalPrice(SubTotal(data.payload));
            }
            getListCart();
        }
    }, [dispath]);
    
    const handleClickImage = () => {
        $('.md').removeClass('animated');
        setModalCart(!isShowModal);
    }

    const handleMinusCount = async (id) => {
        if(accessToken) { 
            const objData = {
                accessToken: accessToken,
                idCarts: id,
            }
            await dispath(minusCarts(objData));

            var index = listCart.findIndex(obj => obj.id === id);
            if(listCart[index].countProduct > 1)
            {
                listCart[index].countProduct -= 1;
                setlistCart(listCart);
                settotalPrice(SubTotal(listCart))
            }
        }
    }

    const handlePlusCount = async (id) => {
        if(accessToken) { 
            // const objData = {
            //     accessToken: accessToken,
            //     idCarts: id,
            // }
            // await dispath(plusCarts(objData));
            // listCart[index].countProduct += 1;
            // setlistCart(listCart);
            // settotalPrice(SubTotal(listCart))
        }
    }

    const handleRemoveItem = async (id) => {
        if(accessToken) { 
            const objData = {
                accessToken: accessToken,
                idCarts: id,
            }
            await dispath(removeCarts(objData));
            
            var index = listCart.findIndex(obj => obj.id === id);
            
            listCart.splice(index, 1);
            setlistCart(listCart);
            settotalPrice(SubTotal(listCart))
        }
        
    }

    return (
        <div className={isShowModal ? "md animated": "md"}>
            <div className="modal-cart" onClick={ handleCart }>
            </div>
            <div className="mini-cart">
                <div className="md-cart">
                    <div className="btn-md-close" onClick={ handleCart }>
                        <i className="far fa-chevron-left"></i>
                    </div>
                    <div className="title-cart">
                        Giỏ hàng
                    </div>
                </div>
                <div className="content-cart">
                    {listCart.length > 0 ? 
                        <SimpleBar forceVisible="y" autoHide={true} style={{ maxHeight: '100%' }}>
                                {listCart.length > 0 ?
                                listCart.map(function(data, index) {
                                return <div className="cart-item" key={index}>
                                    <div className="image-pd" onClick={handleClickImage}>
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
                                                    className={data.countProduct > 1 ? "fal fa-minus" : "fal fa-minus hide"}
                                                    onClick={() => handleMinusCount(data.id)}
                                                ></i>
                                                </div>
                                            <div className="btn-plus">
                                                <i 
                                                    className="fal fa-plus"
                                                    onClick={() => handlePlusCount(data.id)}
                                                ></i>
                                            </div>
                                            <span>{data.countProduct}</span>
                                        </div>
                                    </div>
                                    <div className="btn-remove" onClick={() => handleRemoveItem(data.id)}>
                                        <i className="fal fa-times"></i>
                                    </div>
                                </div>
                                    }) : ''}
                        </SimpleBar>
                    :
                    <span>
                        Giỏ hàng hiện đang trống
                    </span>
                    }
                    
                    </div>
                    {listCart.length > 0 ?  
                    <>
                        <div className="cart-subtotal">
                            <div className="cart-subtotal__title">Tổng tiền thanh toán</div>
                            <div className="cart-subtotal__price">{totalPrice.toLocaleString()} đ</div>
                        </div>
                        <div className="cart-btn-view">
                            <div className="btn btn-view-cart">Xem Giỏ Hàng</div>
                        </div>
                    </>
                    : ''}
            </div>
        </div>
    );
};


Cart.propTypes = {
    handleCart: PropTypes.func,
    isShowModal: PropTypes.bool,
    setModalCart: PropTypes.func,
};

Cart.defaultProps = {
    handleCart: null,
    isShowModal: false,
}


export default Cart;
