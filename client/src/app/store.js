import { configureStore } from '@reduxjs/toolkit';
import registerReducer from 'features/Auth/authSlice';
import { default as cartReducers, default as listCartsReducer } from 'features/Cart/cartSlice';
import isShowCartReducers from 'features/Cart/isShowCartSlice';
import totalPriceCartReducers from 'features/Cart/totalPriceSlice';
import productsReducers from 'features/Product/productSlice';
import productDetailReducers from 'features/ProductDetail/productDetail';

const rootReducer = {
    registers: registerReducer,
    listCarts: listCartsReducer,
    products: productsReducers,
    productsDetail: productDetailReducers,
    carts: cartReducers,
    totalPriceCart: totalPriceCartReducers,
    isShowCart: isShowCartReducers,
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;