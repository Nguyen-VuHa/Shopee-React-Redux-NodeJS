import { createSlice } from "@reduxjs/toolkit";

var initialState = false;

const isLoginSlice = createSlice({ 
    name: 'isLogin',
    initialState,
    reducers: {
        setIsLogin: () => {
            return true;
        },
        setIsLogout: () => {
            return false;
        }
    },
});

const  { reducer, actions } = isLoginSlice;
export const { setIsLogin, setIsLogout } = actions;
export default reducer;