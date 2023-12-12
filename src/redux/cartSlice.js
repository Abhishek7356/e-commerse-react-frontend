import { createSlice } from '@reduxjs/toolkit'
import { getCart } from '../services/allApi';

const initialState = []
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        GetProduct: (state, action) => {
            return action.payload
        },
        addCartProduct: (state, action) => {
            state.push(action.payload);
        },
        deleteProduct: (state, action) => {
            return state.filter((item) => item._id != action.payload)
        },
        emptyCart: (state, action) => {
            return state = []
        },
    }
})


export const { GetProduct, addCartProduct, deleteProduct, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;