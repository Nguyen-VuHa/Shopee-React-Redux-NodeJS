import { configureStore } from '@reduxjs/toolkit';
import registerReducer from 'features/Auth/authSlice';
import listCartsReducer from 'features/Cart/cartSlice';
import adProductReducers from 'features/Admin/adminProductSlice';
import editProductReducers from 'features/Admin/pages/AddUpdateProducts/editSlice';
import adCategoryReducers from 'features/Admin/adminCategorySlice';
import modalCheckedListReducers from 'features/Admin/components/ModalCategory/modalCategorySlice';
import productsReducers from 'features/Product/productSlice';
import productDetailReducers from 'features/ProductDetail/productDetail';

const rootReducer = {
    registers: registerReducer,
    listCarts: listCartsReducer,
    adProducts: adProductReducers,
    editProduct: editProductReducers,
    adCategories: adCategoryReducers,
    modalChecked: modalCheckedListReducers,
    products: productsReducers,
    productsDetail: productDetailReducers,
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;