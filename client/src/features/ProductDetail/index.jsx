import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import MainDetailProduct from './pages/MainProductDetail';
import './product-detail.scss';
import { getListProduct } from './productDetail';


const ProductDetail = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
       const action = getListProduct();
       dispatch(action);
       
    }, [dispatch]);

    return (
        <>
            <div className="container ip-content">
                <Switch>
                   <MainDetailProduct />
                </Switch>
            </div>
        </>
    );
};


ProductDetail.propTypes = {

};


export default ProductDetail;
