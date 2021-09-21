import { configureStore } from '@reduxjs/toolkit';
import registerReducer from 'features/Auth/authSlice';
import productReducer from 'features/Admin/adminSlice';
import listCartsReducer from 'features/Cart/cartSlice';
import adminReducer from 'features/Admin/adminSlice';
import adProductReducers from 'features/Admin/adminProductSlice';
import editProductReducers from 'features/Admin/pages/AddUpdateProducts/editSlice';

const rootReducer = {
    registers: registerReducer,
    products: productReducer,
    listCarts: listCartsReducer,
    adminProduct : adminReducer, 
    adProducts: adProductReducers,
    editProduct: editProductReducers,
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;