import { createSlice } from "@reduxjs/toolkit";

var initialState = {
    idProduct: '',
    nameProduct: '',
    imageUrl: '',
    descProduct: '',
    price: 0,
    status: 0,
    detailDesciption: [],
};

const editProductSlice = createSlice({ 
    name: 'editProduct',
    initialState: initialState,
    reducers: {
        getEditProduct: (state) => {
            return state;
        },
        setItemProduct: (action) => {
            return action.payload;
        },
    }, 
})

const  { reducer, actions } = editProductSlice;
export const { getEditProduct, setItemProduct } = actions; 
export default reducer;