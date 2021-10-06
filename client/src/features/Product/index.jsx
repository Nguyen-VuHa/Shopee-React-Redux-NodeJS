import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import MainProduct from './pages/MainProduct';
import './product-store.scss';
import { getNameCategory, getProductView } from './productSlice';

const ProductStore = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const actionProductView = getProductView();
        dispatch(actionProductView);
        const actionListName = getNameCategory();
        dispatch(actionListName);
    }, [dispatch]);

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
