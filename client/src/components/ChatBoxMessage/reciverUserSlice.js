import {  createSlice } from "@reduxjs/toolkit";

const receiverUserSlice = createSlice({
    name: 'receiverUser',
    initialState: [],
    reducers: {
        addUserChat: (state, action) => {
            let checkId = state.filter(id => id === action.payload);
            if(checkId.length > 0)
                return state;
            else
            {
                return state.concat(action.payload);
            }
        }
    }
})

const  { reducer, actions } = receiverUserSlice;
export const { addUserChat } = actions;
export default reducer;