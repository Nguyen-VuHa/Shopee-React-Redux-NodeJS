import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import FadeLoader from 'react-spinners/FadeLoader';

const WrapperProduct = (props) => {
    const history = useHistory();

    const handleViewProduct = (nameProduct) => {
        history.push(`/product-page/${nameProduct.replaceAll(' ', '-')}`);
    }

    return (
        <div className="content-product">
            {props.listProduct.length > 0 ? 
                props.listProduct.map(function(data, index) {
                    return <div className="product-item" key={index} onClick={() => handleViewProduct(data.nameProduct)}>
                        <div className="image-pd">
                            <img src={data.imageUrl} alt="NotImage"/>
                        </div>
                        <div className="info-pd">
                            <span className="name-pd">{data.nameProduct}</span>
                            <span className="price">{data.price.toLocaleString()} đ</span>
                        </div>
                    </div>
                })
                : 'Không Có Sản Phẩm Để Hiển Thị'
            }
            {props.isLoading === true ? <div className="layout-loading">
                <div className="loading-page">
                    <FadeLoader color="#bc4c2a" loading={true} size={5}/>
                </div>
            </div> : ''}
        </div>
    );
};


WrapperProduct.propTypes = {
    listProduct: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
};


export default WrapperProduct;
