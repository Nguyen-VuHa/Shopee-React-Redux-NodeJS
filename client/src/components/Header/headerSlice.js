import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notifyApi from "api/notifyApi";
import cartsApi from "api/cartsApi";

export const getNotify = createAsyncThunk('Header/getNotify', async (thunkApi) => {
    const messageNotify = await notifyApi.getNotify(thunkApi);
    return messageNotify;
})

export const getCount = createAsyncThunk('Header/getCount', async (thunkApi) => {
    const messageCount = await notifyApi.getCount(thunkApi);
    return messageCount;
})

export const postUpdate = createAsyncThunk('Header/postUpdate', async (thunkApi) => {
    const messageUpdate = await notifyApi.postUpdate(thunkApi);
    return messageUpdate;
})

export const getCarts = createAsyncThunk('Header/getCarts', async (thunkApi) => {
    const messageUpdate = await cartsApi.getCarts(thunkApi);
    return messageUpdate;
})

const authApis = createSlice({
    name: 'getNotify',
    initialState: {
        statusMesage: '',
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
            [getNotify.pending]: (state) => {
                state.loading = true;
            },
            [getNotify.rejected]: (state, action) => {
                state.loading = false;
                state.error = action.payload;
            },
            [getNotify.fulfilled]: (state, action) => {
                state.loading = false;
                state.statusMesage = action.payload;
            },
        }
    },{
        name: 'getCount',
        initialState: {
            statusMesage: '',
            loading: false,
            error: '',
        },
        reducers: {},
        extraReducers: {
            [getCount.pending]: (state) => {
                state.loading = true;
            },
            [getCount.rejected]: (state, action) => {
                state.loading = false;
                state.error = action.payload;
            },
            [getCount.fulfilled]: (state, action) => {
                state.loading = false;
                state.statusMesage = action.payload;
            },
        }
    },{
        name: 'postUpdate',
        initialState: {
            statusMesage: '',
            loading: false,
            error: '',
        },
        reducers: {},
        extraReducers: {
            [postUpdate.pending]: (state) => {
                state.loading = true;
            },
            [postUpdate.rejected]: (state, action) => {
                state.loading = false;
                state.error = action.payload;
            },
            [postUpdate.fulfilled]: (state, action) => {
                state.loading = false;
                state.statusMesage = action.payload;
            },
        }
    },{
        name: 'getCarts',
        initialState: {
            statusMesage: '',
            loading: false,
            error: '',
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
    },
)

const  { reducer } = authApis;
export default reducer;