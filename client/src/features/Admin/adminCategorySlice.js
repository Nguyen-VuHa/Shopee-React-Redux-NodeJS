import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryApi from "api/categoryApi";

var initialState = {
    categories: {
        objData: [],
        countProduct: 0
    },
    statusMesage: '',
    loading: false,
    error: '',
};

export const getAllCategory = createAsyncThunk('GET_ALL_CATEGORY', async () => {
    const stateReponse = await categoryApi.getAllCategory();
    return stateReponse;
})

export const createCategory = createAsyncThunk('NEW_CATEGORY', async (thunkApi) => {
    const stateReponse = await categoryApi.createCategory(thunkApi);
    return stateReponse;
})

export const updateCategory = createAsyncThunk('UPDATE_CATEGORY', async (thunkApi) => {
    const stateReponse = await categoryApi.updateCategory(thunkApi);
    return stateReponse;
})

export const deleteCategory = createAsyncThunk('DELETE_CATEGORY', async (thunkApi) => {
    const stateReponse = await categoryApi.deleteCategory(thunkApi);
    return stateReponse;
})


const adminCategoryApis = createSlice({  
    name: 'categories',
    initialState: initialState,
    reducers: {}, 
    extraReducers: { 
        // GET ALL CATEGORY
        [getAllCategory.pending]: (state) => {
            state.loading = true;
        },
        [getAllCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getAllCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload;
            state.statusMesage = 'OK'
        },
        // CREATE A CATEGORY
        [createCategory.pending]: (state) => {
            state.loading = true;
        },
        [createCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [createCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.statusMesage = action.payload;
        },
         // UPDATE A CATEGORY
        [updateCategory.pending]: (state) => {
            state.loading = true;
        },
        [updateCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [updateCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.statusMesage = action.payload;
        },
        // DELETE A CATEGORY
        [deleteCategory.pending]: (state) => {
            state.loading = true;
        },
        [deleteCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deleteCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.statusMesage = action.payload;
        },
    }
});

const  { reducer } = adminCategoryApis;
export default reducer;