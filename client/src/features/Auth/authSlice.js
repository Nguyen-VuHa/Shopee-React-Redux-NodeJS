import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "api/authApi";

export const getRegister = createAsyncThunk('register/getRegister', async (thunkApi) => {
    const messageRegister = await authApi.createAccount(thunkApi);
    return messageRegister;
})

export const getLogin = createAsyncThunk('login/getLogin', async (thunkApi) => {
    const messageLogin = await authApi.login(thunkApi);
    return messageLogin;
})

const authApis = createSlice({
    name: 'register',
    initialState: {
        statusMesage: '',
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
        [getRegister.pending]: (state) => {
            state.loading = true;
        },
        [getRegister.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getRegister.fulfilled]: (state, action) => {
            state.loading = false;
            state.statusMesage = action.payload;
        },
    }
}, {
    name: 'login',
    initialState: {
        statusMesage: '',
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
        [getRegister.pending]: (state) => {
            state.loading = true;
        },
        [getRegister.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getRegister.fulfilled]: (state, action) => {
            state.loading = false;
            state.statusMesage = action.payload;
        },
    }
})

const  { reducer } = authApis;
export default reducer;