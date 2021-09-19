import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartsApi from "api/cartsApi";

export const getCarts = createAsyncThunk('Header/getCarts', async (thunkApi) => {
    const messageUpdate = await cartsApi.getCarts(thunkApi);
    return messageUpdate;
})

export const plusCarts = createAsyncThunk('Header/plusCarts', async (thunkApi) => {
    const messagePlusCount = await cartsApi.plusCount(thunkApi.accessToken, thunkApi.idCarts);
    return messagePlusCount;
})

export const minusCarts = createAsyncThunk('Header/minusCarts', async (thunkApi) => {
    const messageMinusCount = await cartsApi.minusCount(thunkApi.accessToken, thunkApi.idCarts);
    return messageMinusCount;
})

export const removeCarts = createAsyncThunk('Header/removeCarts', async (thunkApi) => {
    const messageRemoveItem = await cartsApi.removeItemCarts(thunkApi.accessToken, thunkApi.idCarts);
    return messageRemoveItem;
})


const cartApi = createSlice({
    name: 'getCarts',
    initialState: {
        listCarts: getCarts.payload,
    },
    reducers: {},
    extraReducers: {
        [getCarts.pending]: (state) => {
            state.loading = true;
        },
        [getCarts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getCarts.fulfilled]: (state, action) => {
            state.loading = false;
            state.statusMesage = action.payload;
        },
    }
},{
    name: 'plusCarts',
    initialState: {
        statusMesage: '',
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
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
    }
},{
    name: 'minusCarts',
    initialState: {
        statusMesage: '',
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
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
    }
},{
    name: 'removeItemCarts',
    initialState: {
        statusMesage: '',
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
        [removeCarts.pending]: (state) => {
            state.loading = true;
        },
        [removeCarts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [removeCarts.fulfilled]: (state, action) => {
            state.loading = false;
            state.statusMesage = action.payload;
        },
    }
})

const  { reducer } = cartApi;
export default reducer;