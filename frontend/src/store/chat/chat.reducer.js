import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'chat',
    initialState: [{message:"", role:""}],
    reducers: {
        addMessage: (state, action) => {
            state.push(action.payload) // under the hood, immer is used to make this immutable
        }
    }
})

export const { addMessage } = chatSlice.actions
export const chatReducer = chatSlice.reducer    