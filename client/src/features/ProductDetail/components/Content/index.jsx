import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import {
    SideBySideMagnifier
} from "react-image-magnifiers";
import { UncontrolledCollapse } from 'reactstrap';


const ContentDetail = (props) => {
    const [countProduct, setcountProduct] = useState(1);
    
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

    return (
        <div className="product-detail">
            <div className="pdt-item">
                <div className="product-img">
                    <SideBySideMagnifier 
                        imageSrc={props.listProduct && props.listProduct.urlImage} 
                        imageAlt="NotImage"
                        largeImageSrc={props.listProduct && props.listProduct.urlImage} 
                        alwaysInPlace={true}
                        fillAvailableSpace={true}
                    />
                </div>
                <div className="product-desc">
                    {props.listProduct && props.listProduct.descProduct}
                </div>
            </div>
            <div className="pdt-item">
                <div className="name-product">
                    {props.listProduct && props.listProduct.nameProduct}
                </div>
                <div className="price-product">
                    {props.listProduct && props.listProduct.price.toLocaleString()} đ
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
                    <div className="btn btn-cart">Thêm vào giỏ hàng</div>
                    <div className="btn btn-buy">Mua Ngay</div>
                </div>
                <div className="group-desc">
                    {props.listProduct && props.listProduct.additional.length > 0 ? 
                        props.listProduct.additional.map(function(data, index) {
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
