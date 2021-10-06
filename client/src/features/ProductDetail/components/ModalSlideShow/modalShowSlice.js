import { createSlice } from "@reduxjs/toolkit";

var initialState = {
    isShow: false,
    imageSlice: [],
    indexImage: 0,
}

const modalSlideShow = createSlice({
    name: 'modalSlideShow',
    initialState,
    reducers: {
        setAllImage: (state, action) => {
            state = initialState;
            state = {
                ...state,
                imageSlice: action.payload.slice(0).reverse(),
            }
            return state;
        },
        setOpenModal: (state) => {
            state = {
                ...state,
                isShow: true,
            }
            return state;
        },
        setCloseModal: (state) => {
            state = {
                ...state,
                isShow: false,
            }
            return state;
        },
        setIndexImage: (state, action) => {
            state = {
                ...state,
                indexImage: action.payload,
            }
            return state;
        }
    },
})


const { reducer, actions } = modalSlideShow;
export const { setOpenModal, setCloseModal, setAllImage, setIndexImage } = actions;
export default reducer;