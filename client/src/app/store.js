import { configureStore } from '@reduxjs/toolkit';
import registerReducer from 'features/Auth/authSlice';
import productReducer from 'features/Admin/adminSlice';
import listCartsReducer from 'features/Cart/cartSlice';
import adminReducer from 'features/Admin/adminSlice';

const rootReducer = {
    registers: registerReducer,
    products: productReducer,
    listCarts: listCartsReducer,
    adminProduct : adminReducer, 
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;