import { createSlice } from "@reduxjs/toolkit";

var initialState = false;

const isShowCart = createSlice({ 
    name: 'totalPriceCarts',
    initialState: initialState,
    reducers: {
        toggleCart: (state) => {
            return !state;
        },
        closeCart: () => {
            return false;
        },
        openCart: () => {
            return true;
        }
    },
})

const  { reducer, actions } = isShowCart;
export const { toggleCart, closeCart, openCart } = actions;
export default reducer;