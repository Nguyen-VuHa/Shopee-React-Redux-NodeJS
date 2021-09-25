import { createSlice } from "@reduxjs/toolkit";

var initialState = 0;

function SubTotal(listData) {
    var total = 0;
    listData.forEach(item => {
        total += (item.SANPHAM.price * item.countProduct);
    })
    
    return total;
}

const totalPrice = createSlice({ 
    name: 'totalPriceCarts',
    initialState: initialState,
    reducers: {
        setTotalPrice: (state, action) => {
            state = SubTotal(action.payload);
            return state;
        },
        plusTotalPrice: (state, action) => {
            state = state + action.payload;
            return state;
        },
        minusTotalPrice: (state, action) => {
            state = state - action.payload;
            return state;
        }
    },
})

const  { reducer, actions } = totalPrice;
export const { setTotalPrice, plusTotalPrice, minusTotalPrice } = actions;
export default reducer;