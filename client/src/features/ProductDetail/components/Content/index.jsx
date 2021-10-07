import { productImgDetailSelectors } from 'features/ProductDetail/productDetail';
import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageGaleryView from '../ImageGaleryView';
import { setAllImage } from '../ModalSlideShow/modalShowSlice';

const ContentDetail = (props) => {
    const { data } = props;
    const [countProduct, setcountProduct] = useState(1);
    const dispatch = useDispatch();
   
    const stateImage = useSelector(productImgDetailSelectors.selectAll);
    
    useEffect(() => {
        dispatch(setAllImage(stateImage.filter(id => id.Image_idProduct === data.idProduct)));
    }, [dispatch , data, stateImage]);


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
