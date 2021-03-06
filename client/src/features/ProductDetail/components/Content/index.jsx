import { ToastContext } from 'context/toastContext';
import { productImgDetailSelectors } from 'features/ProductDetail/productDetail';
import $ from 'jquery';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageGaleryView from '../ImageGaleryView';
import { setAllImage } from '../ModalSlideShow/modalShowSlice';
import { v4 as uuidv4 } from 'uuid';
import { addItemInCarts } from 'features/Cart/cartSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { openCart } from 'features/Cart/isShowCartSlice';
import { ModalProductContext } from 'context/modalProductContext';

const ContentDetail = (props) => {
    const { data } = props;
    const [countProduct, setcountProduct] = useState(1);
    const isLogin = useSelector((state) => state.isLogin);
    const {dispatch} = useContext(ToastContext);
    const {dispatchModal} = useContext(ModalProductContext);
    const disPatch = useDispatch();
   
    const stateImage = useSelector(productImgDetailSelectors.selectAll);
    
    useEffect(() => {
        disPatch(setAllImage(stateImage.filter(id => id.Image_idProduct === data.idProduct)));
    }, [disPatch , data, stateImage]);


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
    
    const handleAddToCart = async () => {
        if(isLogin) {
            var objData = {
                data: {
                    idProduct: data.idProduct,
                    countProduct,
                },
                accessToken: localStorage.getItem('accessToken'),
            }
            const result = await disPatch(addItemInCarts(objData));
            const messageResult = unwrapResult(result);
            if(messageResult.status === 'success'){
                disPatch(openCart());
            }
        }
        else {
            dispatch({
                type: 'ADD_NOTIFICATION',
                payload: {
                    id: uuidv4(),
                    type: 'ERROR',
                    title: 'Authentication !',
                    message: 'B???n ch??a ????ng nh???p! kh??ng th??? th??m v??o gi???!',
                    position: 'top-right'
                }
            });
        }
    }

    const handlePayProduct = () => {
        dispatchModal({
            type: 'ADD_MODAL_CONTEXT',
            payload: {
                status : true,   
                title: 'Hi???n t???i, ch??ng t??i ch??a t??ch h???p thanh to??n tr???c ti???p!',
                message: 'B???n c?? th??? li??n h??? tr???c ti???p shop ????? ???????c t?? v???n ho???c ?????t h??ng qua Shopee',
            }
        })
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
                        { data.price.toLocaleString()} ??
                    </div>
                    <div className="count-product">
                        <div className="name-count mb-3">S??? l?????ng</div>
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
                        >Th??m v??o gi??? h??ng</div>
                        <div 
                            className="btn btn-buy"
                            onClick={() => handlePayProduct()}
                        >Mua Ngay</div>
                    </div>
                </div>
            </div>
            <div className="product-desc">
                <div className="desc__header">
                    <h1>M?? T??? S???n Ph???m</h1>
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
