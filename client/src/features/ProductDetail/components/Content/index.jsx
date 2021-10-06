import { addItemCart, addItemInCarts } from 'features/Cart/cartSlice';
import { openCart } from 'features/Cart/isShowCartSlice';
import { productImgDetailSelectors } from 'features/ProductDetail/productDetail';
import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UncontrolledCollapse } from 'reactstrap';
import ImageGaleryView from '../ImageGaleryView';

const ContentDetail = (props) => {
    const { data } = props;
    const [countProduct, setcountProduct] = useState(1);
    const accessToken = localStorage.getItem('accessToken');
    const dispatch = useDispatch();
   
    const stateImage = useSelector(productImgDetailSelectors.selectAll);
    
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
        // if(accessToken) {
        //     const actionAdd = addItemCart(listProduct);
        //     dispatch(actionAdd);

        //     const action = addItemInCarts({
        //         accessToken,
        //         data: {
        //             idProduct: listProduct.idProduct,
        //             countProduct: countProduct
        //         }
        //     });
        //     dispatch(action);

        //     const actionShowCart = openCart();
        //     dispatch(actionShowCart);
        // }
        
    }

    return (
        <>
            <div className="product-detail">
                <div className="pdt-item">
                <ImageGaleryView dataImage={stateImage.filter(id => id.Image_idProduct === data.idProduct)}/>
                </div>
                <div className="pdt-item pdt-item__left">
                    <div className="name-product">
                        { data.nameProduct }
                    </div>
                    <div className="price-product">
                        { data.price.toLocaleString()} đ
                    </div>
                    <div className="count-product">
                        <div className="name-count mb-3">Số lượng</div>
                        <div className="gp-count">
                            <i className={countProduct === 1 ? "fal fa-minus hide" : "fal fa-minus"} onClick={handleMinusCount}></i>
                            <div className="count">{countProduct}</div>
                            <i className="fal fa-plus" onClick={handlePlusCount}></i>
                        </div>
                    </div>
                    <div className="group-button mt-5">
                        <div 
                            className="btn btn-cart"
                            onClick={() => handleAddToCart()}
                        >Thêm vào giỏ hàng</div>
                        <div className="btn btn-buy">Mua Ngay</div>
                    </div>
                </div>
            </div>
            <div className="product-desc">
                <div className="desc__header">
                    <h1>Mô Tả Sản Phẩm</h1>
                </div>
                <div className="desc__content">
                    <span>
                        { data.descProduct }
                    </span>
                </div>
            </div>
        </>
       
    );
};



export default ContentDetail;
