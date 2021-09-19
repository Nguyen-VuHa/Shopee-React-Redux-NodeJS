import { configureStore } from '@reduxjs/toolkit';
import registerReducer from 'features/Auth/authSlice';
import productReduce from 'features/Admin/adminSlice';
import listCartsReduce from 'features/Cart/cartSlice';

const rootReducer = {
    registers: registerReducer,
    products: productReduce,
    listCarts: listCartsReduce,
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;