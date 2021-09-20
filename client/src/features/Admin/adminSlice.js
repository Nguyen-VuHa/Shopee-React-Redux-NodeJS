import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminApi from "api/adminApi";
import productApi from "api/productApi";

var initialState = {
    products: [],
    statusMesage: '',
    loading: false,
    error: '',
};

export const getAllProducts = createAsyncThunk('admin/getAllProducts' , async () => { 
    const stateReponse = await productApi.getAllProduct();
    return stateReponse;
})

export const createProduct = createAsyncThunk('admin/createProduct', async (thunkApi) => {
    const stateReponse = await productApi.postProduct(thunkApi);
    return stateReponse;
})

export const postUpdateProduct = createAsyncThunk('admin/postUpdateProduct', async (thunkApi) => {
    const mesage = await adminApi.UpdateProduct(thunkApi);
    return mesage;
})

export const createCategory = createAsyncThunk('admin/createCategory', async (thunkApi) => {
    const mesage = await adminApi.newCategory(thunkApi);
    return mesage;
})

export const deleteCategory = createAsyncThunk('admin/deleteCategory', async (thunkApi) => {
    const mesage = await adminApi.removeCategory(thunkApi);
    return mesage;
})

export const getCategoryById = createAsyncThunk('admin/getCategoryById', async (thunkApi) => {
    const mesage = await adminApi.getCategoryById(thunkApi);
    return mesage;
})

export const updateCategory = createAsyncThunk('admin/updateCategory', async (thunkApi) => {
    const mesage = await adminApi.updateCategory(thunkApi);
    return mesage;
})




const adminApis = createSlice({ 
    name: 'products',
    initialState: initialState,
    reducers: {
        updateProduct: (state, action) => {
            console.log(action);
            return state;
        }
    }, 
    extraReducers: {
        // GET ALL PRODUCTS
        [getAllProducts.pending]: (state) => {
            state.loading = true;
        },
        [getAllProducts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.statusMesage = 'OK'
        },
        //
    }
},{ 
    name: 'update-product',
    initialState: {
        statusMesage: '',
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
        [postUpdateProduct.pending]: (state) => {
            state.loading = true;
        },
        [postUpdateProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [postUpdateProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.statusMesage = action.payload;
        },
    }
},{ 
    name: 'new-category',
    initialState: {
        statusMesage: '',
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
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
    }
},{ 
    name: 'remove-category',
    initialState: {
        statusMesage: '',
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
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
},{ 
    name: 'get-categorybyid',
    initialState: {
        statusMesage: '',
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
        [getCategoryById.pending]: (state) => {
            state.loading = true;
        },
        [getCategoryById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getCategoryById.fulfilled]: (state, action) => {
            state.loading = false;
            state.statusMesage = action.payload;
        },
    }
},{ 
    name: 'update-category',
    initialState: {
        statusMesage: '',
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
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
    }
},)

const  { reducer, actions } = adminApis;
export const { removeItem } = actions;
export default reducer;