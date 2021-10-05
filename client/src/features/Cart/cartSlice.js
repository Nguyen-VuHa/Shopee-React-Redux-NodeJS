import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import cartsApi from "api/cartsApi";

var initialState = {
    listCart: [],
    statusMesage: '',
    loading: false,
    error: '',
}

export const getProductInCarts = createAsyncThunk('GET_PRODUCT_CART', async (thunkApi) => {
    const stateReponse = await cartsApi.getCarts(thunkApi);
    return stateReponse;
})

export const addItemInCarts = createAsyncThunk('ADD_ITEM_CART', async (thunkApi) => {
    const stateReponse = await cartsApi.addCarts(thunkApi);
    return stateReponse;
})

export const plusCarts = createAsyncThunk('PLUS_COUNT_CART', async (thunkApi) => {
    const stateReponse = await cartsApi.plusCount(thunkApi.accessToken, thunkApi.idCarts);
    return stateReponse;
})

export const minusCarts = createAsyncThunk('MINUS_COUNT_CART', async (thunkApi) => {
    const stateReponse = await cartsApi.minusCount(thunkApi.accessToken, thunkApi.idCarts);
    return stateReponse;
})

export const removeCarts = createAsyncThunk('REMOVE_ITEM_CART', async (thunkApi) => {
    const messageRemoveItem = await cartsApi.removeItemCarts(thunkApi.accessToken, thunkApi.idCarts);
    return messageRemoveItem;
})

const cartAdapter = createEntityAdapter({
    selectId: (cart) => cart.idCarts,
})

const cartApi = createSlice({
    name: 'carts',
    initialState: cartAdapter.getInitialState(initialState),
    reducers: {
        addItemCart: (state, action) => {
            console.log(state.listCart, action);
            return state;
        }
    },
    extraReducers: {
        // GET ITEM PRODUCT IN CART
        [getProductInCarts.pending]: (state) => {
            state.loading = true;
        },
        [getProductInCarts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getProductInCarts.fulfilled]: (state, action) => {
            state.loading = false;
            cartAdapter.setAll(state, action.payload);
            state.statusMesage = 'OK';
        },
        // ADD ITEM CART
        [addItemInCarts.pending]: (state) => {
            state.loading = true;
        },
        [addItemInCarts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [addItemInCarts.fulfilled]: (state, action) => {
            state.loading = false;
            state.statusMesage = action.payload;
        },
        // PLUS COUNT ITEM CART
        [plusCarts.pending]: (state) => {
            state.loading = true;
        },
        [plusCarts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [plusCarts.fulfilled]: (state, action) => {
            state.loading = false;
            state.statusMesage = action.payload;
        },
        // MINUS COUNT ITEM CART 
        [minusCarts.pending]: (state) => {
            state.loading = true;
        },
        [minusCarts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [minusCarts.fulfilled]: (state, action) => {
            state.loading = false;
            state.statusMesage = action.payload;
        },
        // REMOVE ITEM CART
        [removeCarts.pending]: (state) => {
            state.loading = true;
        },
        [removeCarts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [removeCarts.fulfilled]: (state, action) => {
            state.loading = false;
            state.statusMesage = action.payload.status;
            state.listCart = action.payload.data;
        },
    }
})

export const cartSelectors = cartAdapter.getSelectors(
    (state) => state.cart
)

const  { reducer, actions } = cartApi;
export const { addItemCart } = actions;
export default reducer;