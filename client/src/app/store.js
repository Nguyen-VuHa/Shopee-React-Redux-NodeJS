import { configureStore } from '@reduxjs/toolkit';
import registerReducer from 'features/Auth/authSlice';
import isShowCartReducers from 'features/Cart/isShowCartSlice';
import productViewReducers from 'features/Product/productSlice';
import productDetailReducers from 'features/ProductDetail/productDetail';
import homepageReducers from 'features/HomePage/homepageSlice';
import modalSlideShow from 'features/ProductDetail/components/ModalSlideShow/modalShowSlice';
import isLoginReducer from 'constants/isLoginSlice';
import cartsReducer from 'features/Cart/cartSlice';

const rootReducer = {
    registers: registerReducer,
    homepages: homepageReducers,
    productView: productViewReducers,
    listProductDetail: productDetailReducers,
    modalSlide: modalSlideShow,
    isLogin: isLoginReducer,
    carts: cartsReducer,
    isShowCart: isShowCartReducers,
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;