import { productViewSelectors } from 'features/Product/productSlice';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

const WrapperProduct = () => {
    const history = useHistory();
    const [isLoading, setisLoading] = useState(true);
    const stateProduct = useSelector(productViewSelectors.selectAll);

    useEffect(() => {
        if(stateProduct.length > 0)
            setisLoading(false);
    }, [stateProduct]);

    const handleViewProduct = (nameProduct) => {
        history.push(`/product-page/${nameProduct.replaceAll(' ', '-')}`);
    }

    return (
        <div className="content-product">
            {
                stateProduct.length > 0 ? 
                    stateProduct.map(function(data, index) {
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
                    :  
                    <div className="empty-product">
                        <h1>Không có sản phẩm nào!</h1>
                    </div>
                    
            }
            {
                isLoading ?  <div className="layout-loading">
                                <div className="loading-page">
                                    <FadeLoader color="#bc4c2a" loading={true} size={5}/>
                                </div>
                            </div>
                        : ''
            }
        </div>
    );
};


WrapperProduct.propTypes = {
    
};


export default WrapperProduct;
