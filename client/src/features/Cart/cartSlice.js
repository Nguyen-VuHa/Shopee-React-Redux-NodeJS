import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import cartsApi from "api/cartsApi";


export const getProductInCarts = createAsyncThunk('GET_PRODUCT_CART', async (thunkApi) => {
    const stateReponse = await cartsApi.getCarts(thunkApi);
    return stateReponse;
})

export const addItemInCarts = createAsyncThunk('ADD_ITEM_CART', async (thunkApi) => {
    const stateReponse = await cartsApi.addCarts(thunkApi);
    if(stateReponse.role === 'Update') {
        return {
            status: stateReponse.status,
            role: stateReponse.role,
            id: stateReponse.data.id,
            changes: {  
                countProduct: stateReponse.data.countProduct 
            },
        };
    }
    else {
        return {
            status: stateReponse.status,
            data: stateReponse.data,
        };
    }
    
})

export const plusCarts = createAsyncThunk('PLUS_COUNT_CART', async ({idCarts, accessToken, countProduct }) => {
    const stateReponse = await cartsApi.plusCount(accessToken, idCarts);
    return { 
        stateReponse,
        id: idCarts,
        countProduct,
    };
})

export const minusCarts = createAsyncThunk('MINUS_COUNT_CART', async ({idCarts, accessToken, countProduct }) => {
    const stateReponse = await cartsApi.minusCount(accessToken, idCarts);
    return { 
        stateReponse,
        id: idCarts,
        countProduct,
    };
})

export const removeCarts = createAsyncThunk('REMOVE_ITEM_CART', async (thunkApi) => {
    const stateReponse = await cartsApi.removeItemCarts(thunkApi.accessToken, thunkApi.idCarts);
    return { status: stateReponse.status, id: thunkApi.idCarts };
})

const cartAdapter = createEntityAdapter({
    selectId: (cart) => cart.id,
})

const cartSlice = createSlice({
    name: 'carts',
    initialState: cartAdapter.getInitialState({
        loading: false,
        error: '',

    }),
    reducers: {},
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
            state.error = '';
            cartAdapter.setAll(state, action.payload);
        },
        // ADD ITEM CART
        [addItemInCarts.pending]: (state) => {
            state.loading = true;
        },
        [addItemInCarts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [addItemInCarts.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            if(payload.role === 'Update') {
                cartAdapter.updateOne(state, { id: payload.id, changes: payload.changes });
            }
            else {
                cartAdapter.addOne(state, payload.data);
            }
        },
        // PLUS COUNT ITEM CART
        [plusCarts.pending]: (state) => {
            state.loading = true;
        },
        [plusCarts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [plusCarts.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            cartAdapter.updateOne(state, { id: payload.id, changes: { countProduct: payload.countProduct }});
        },
        // MINUS COUNT ITEM CART 
        [minusCarts.pending]: (state) => {
            state.loading = true;
        },
        [minusCarts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [minusCarts.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            cartAdapter.updateOne(state, { id: payload.id, changes: { countProduct: payload.countProduct }});
        },
        // REMOVE ITEM CART
        [removeCarts.pending]: (state) => {
            state.loading = true;
        },
        [removeCarts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [removeCarts.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            cartAdapter.removeOne(state, payload.id);
        },
    }
})

export const cartSelectors = cartAdapter.getSelectors(
    (state) => state.carts
)

const  { reducer } = cartSlice;
export default reducer;