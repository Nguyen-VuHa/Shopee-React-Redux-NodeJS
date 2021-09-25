import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink } from 'react-router-dom';

const HeaderDetail = (props) => {

    return (
        <>
            <Helmet>
                <title>{props.listProduct.nameProduct} | BIBI Korea</title>
            </Helmet>
            <div className="pdt-header">
                <div className="path">
                    <NavLink to="/" >
                        Trang Chủ
                    </NavLink>/
                    <NavLink to="/shop-all" >
                        Sản Phẩm
                    </NavLink>/
                    <span>{props.listProduct.nameProduct}</span>
                </div>
                <div className="control">
                    <Link className={props.indexList === 0 ? "btn-prev enable" : "btn-prev"} to={`/product-page/${props.allProduct[props.indexList - 1] && props.allProduct[props.indexList - 1].nameProduct.replaceAll(' ', '-')}`}>
                        <i className="fal fa-chevron-left"></i>
                        Trước
                    </Link>
                    <Link className={props.indexList === (props.totalIndex - 1) ? "btn-next enable" : "btn-next"} to={`/product-page/${props.allProduct[props.indexList + 1] && props.allProduct[props.indexList + 1].nameProduct.replaceAll(' ', '-')}`}>
                        Tiếp
                        <i className="fal fa-chevron-right"></i>
                    </Link>
                </div>
            </div>
        </>
    );
};


HeaderDetail.propTypes = {
    indexList: PropTypes.number,
    listProduct: PropTypes.object.isRequired,
    allProduct: PropTypes.array.isRequired,
};


export default HeaderDetail;
