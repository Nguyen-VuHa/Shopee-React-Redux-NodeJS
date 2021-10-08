import { ModalProductContextProvider } from 'context/modalProductContext';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import ModalNotification from './components/ModalNotification';
import ModalSlideShow from './components/ModalSlideShow';
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
            <ModalProductContextProvider>
                <ModalSlideShow />
                <ModalNotification /> 
                <div className="container ip-content">
                    <Switch>
                    <MainDetailProduct />
                    </Switch>
                </div>
            </ModalProductContextProvider>
        </>
    );
};


ProductDetail.propTypes = {

};


export default ProductDetail;
