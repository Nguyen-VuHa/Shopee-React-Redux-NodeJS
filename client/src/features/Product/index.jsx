import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import MainProduct from './pages/MainProduct';
import './product-store.scss';
import { getAllProduct, getAllCategory } from './productSlice';

const ProductStore = () => {
    const dispath = useDispatch();

    useEffect(() => {
        const action_Product = getAllProduct();
        dispath(action_Product);
        const action_Cate = getAllCategory();
        dispath(action_Cate);
    }, [dispath]);

    return (
        <>
            <Helmet>
                <title>BIBI Korea | Sản Phẩm</title>
            </Helmet>
            <MainProduct />
        </>
     
    );
};


ProductStore.propTypes = {

};


export default ProductStore;
