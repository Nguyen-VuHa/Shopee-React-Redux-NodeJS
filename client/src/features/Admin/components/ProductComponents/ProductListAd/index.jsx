import React from 'react';
import { useSelector } from 'react-redux';

const ProductListAd = (props) => {
    return (
        <ul className="pd-content__table">
            { props.children }
        </ul>
    );
};


ProductListAd.propTypes = {

};


export default ProductListAd;
