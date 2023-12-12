import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: JSON.parse(sessionStorage.getItem("user"))
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addLoginUser: (state, action) => {
            state.user = action.payload
        },
    }
})


export const { addLoginUser } = userSlice.actions;
export default userSlice.reducer;