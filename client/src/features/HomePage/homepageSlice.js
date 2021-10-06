import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import categoryApi from "api/categoryApi";

export const getSliders = createAsyncThunk('GET_SLIDER_SALES' , async () => { 
    const stateReponse = await categoryApi.getSlideHomePage();
    return stateReponse;
})

const sliceAdapter = createEntityAdapter({
    selectId: (product) => product.idProduct,
});

const homepageSlice = createSlice({
    name: 'products',
    initialState: sliceAdapter.getInitialState({
        loading: false,
        error: '',
    }),
    reducers: {},
    extraReducers: {
        // GET SLIDER CATEGORY 'BEST SALLERS'
        [getSliders.pending]: (state) => {
            state.loading = true;
        },
        [getSliders.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [getSliders.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            sliceAdapter.setAll(state, payload);
        },
    },
});

export const slidersSelectors = sliceAdapter.getSelectors(state => state.homepages);

const { reducer } = homepageSlice;
export default reducer;