import { addItemCart, addItemInCarts } from 'features/Cart/cartSlice';
import { openCart } from 'features/Cart/isShowCartSlice';
import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import {
    SideBySideMagnifier
} from "react-image-magnifiers";
import { useDispatch, useSelector } from 'react-redux';
import { UncontrolledCollapse } from 'reactstrap';

const ContentDetail = (props) => {
    const { listProduct } = props;
    const [countProduct, setcountProduct] = useState(1);
    const accessToken = localStorage.getItem('accessToken');
    const dispatch = useDispatch();
    
    useEffect(() => {
        $('.btn-desc').on('click', function() {
            if($(this).find('.fa-plus').length > 0) {
                $(this).find('.fal').removeClass('fa-plus');
                $(this).find('.fal').addClass('fa-minus');
            }
            else {
                $(this).find('.fal').removeClass('fa-minus');
                $(this).find('.fal').addClass('fa-plus');
            }
        })
    }, []);

    const handlePlusCount = () => {
        setcountProduct(countProduct + 1);
    }

    const handleMinusCount = () => {
        setcountProduct(countProduct - 1);
    }
    
    const handleAddToCart = () => {
        if(accessToken) {
            const actionAdd = addItemCart(listProduct);
            dispatch(actionAdd);

            const action = addItemInCarts({
                accessToken,
                data: {
                    idProduct: listProduct.idProduct,
                    countProduct: countProduct
                }
            });
            dispatch(action);

            const actionShowCart = openCart();
            dispatch(actionShowCart);
        }
    }

    return (
        <div className="product-detail">
            <div className="pdt-item">
                <div className="product-img">
                    <SideBySideMagnifier 
                        imageSrc={listProduct && listProduct.urlImage} 
                        imageAlt="NotImage"
                        largeImageSrc={ listProduct && listProduct.urlImage} 
                        alwaysInPlace={true}
                        fillAvailableSpace={true}
                    />
                </div>
                <div className="product-desc">
                    { listProduct && listProduct.descProduct}
                </div>
            </div>
            <div className="pdt-item">
                <div className="name-product">
                    {listProduct && listProduct.nameProduct}
                </div>
                <div className="price-product">
                    {listProduct && listProduct.price.toLocaleString()} đ
                </div>
                <div className="count-product">
                    <div>Số lượng</div>
                    <div className="gp-count">
                        <div className="count">{countProduct}</div>
                        <div className="gp-btn">
                            <i className="fal fa-plus" onClick={handlePlusCount}></i>
                            <i className={countProduct === 1 ? "fal fa-minus hide" : "fal fa-minus"} onClick={handleMinusCount}></i>
                        </div>
                    </div>
                </div>
                <div className="group-button">
                    <div 
                        className="btn btn-cart"
                        onClick={() => handleAddToCart()}
                    >Thêm vào giỏ hàng</div>
                    <div className="btn btn-buy">Mua Ngay</div>
                </div>
                <div className="group-desc">
                    {listProduct && listProduct.additional.length > 0 ? 
                        listProduct.additional.map(function(data, index) {
                            return <div className="group-item" key={index}>
                                        <button className="btn btn-desc" id={`desc${data.id}`}>
                                            <div className="name">{data.title}</div>
                                            <div className="icon">
                                                <i className="fal fa-plus"></i>
                                            </div>
                                        </button>
                                        <UncontrolledCollapse toggler={`#desc${data.id}`} >
                                            <span>
                                                {data.desc}
                                            </span>
                                        </UncontrolledCollapse>
                                    </div>
                        }) 
                    : ''}
                </div>
            </div>
        </div>
    );
};



export default ContentDetail;
