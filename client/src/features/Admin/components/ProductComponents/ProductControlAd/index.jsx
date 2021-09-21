import React from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';


const ProductControlAd = (props) => {
    const url = useRouteMatch();
    const { productCount } = props;

    return (
        <div className="pd-header">
            <div className="pd-left">
                <div>Sản Phẩm</div>
                <span>{productCount}</span>
            </div>
            <div className="pd-right">
                <Link to={`${url.path}/new-product`} className="btn-add-pd">
                    <i className="fal fa-plus"></i>
                    Thêm sản phẩm
                </Link>
            </div>
        </div>
    );
};


ProductControlAd.propTypes = {

};


export default ProductControlAd;
