import { createSlice } from "@reduxjs/toolkit";

var initialState = [];

const listCheckedProducts = createSlice({ 
    name: 'checkedProducts',
    initialState: initialState,
    reducers: {
        getListCheckedById: (state, action) => {
            return state;
        },
        setItemProduct: (state, action) => {
            state = [];
            return state.concat(action.payload);
        },
        removeItemProduct: (state, action) => {
            return state.filter(p => p !== action.payload);
        },
    }, 
})

const  { reducer, actions } = listCheckedProducts;
export const { setItemProduct, getListCheckedById, removeItemProduct } = actions; 
export default reducer;
