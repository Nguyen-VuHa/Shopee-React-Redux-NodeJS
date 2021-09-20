import React from 'react';
import { useSelector } from 'react-redux';

const ProductListAd = (props) => {
    return (
        <ul className="pd-content__table">
            { props.children }
            {/* { stateProducts.products ? 
                stateProducts.products.map((data, index) => {
                    return <ProductItemAd key={data.idProduct} index={index} data={data} />
                })
                :   
                <li className="item-table not-product">
                    <h3>Không có sản phẩm nào trong kho</h3>
                </li>
            } */}
        </ul>
    );
};


ProductListAd.propTypes = {

};


export default ProductListAd;
