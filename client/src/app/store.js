import { configureStore } from '@reduxjs/toolkit';
import registerReducer from 'features/Auth/authSlice';
import { default as cartReducers, default as listCartsReducer } from 'features/Cart/cartSlice';
import isShowCartReducers from 'features/Cart/isShowCartSlice';
import totalPriceCartReducers from 'features/Cart/totalPriceSlice';
import productViewReducers from 'features/Product/productSlice';
import productDetailReducers from 'features/ProductDetail/productDetail';
import homepageReducers from 'features/HomePage/homepageSlice';

const rootReducer = {
    registers: registerReducer,
    homepages: homepageReducers,
    productView: productViewReducers,
    listProductDetail: productDetailReducers,

    listCarts: listCartsReducer,
    carts: cartReducers, 
    totalPriceCart: totalPriceCartReducers,
    isShowCart: isShowCartReducers,
   
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;