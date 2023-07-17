import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    messages: [],
    isLoading: false,
    error: null
}

const getMessageResponse = createAsyncThunk("chat/getMessageResponse", async (query) => {
    console.log("Process", import.meta.env.VITE_BASE_API_URL)
    const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/query`, { query })
    
    return response.data.response.queryRes
})

const chatSlice = createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload) // under the hood, immer is used to make this immutable
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMessageResponse.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getMessageResponse.fulfilled, (state, action) => {
            state.messages.push(action.payload)
            state.isLoading = false
        })
        builder.addCase(getMessageResponse.rejected, (state, action) => {
            state.error = action.error.message
            state.messages.push({role:"assistant", text: "Sorry, something went wrong. Please try again later."})
            state.isLoading = false
        })
    }
})

export const { addMessage } = chatSlice.actions
export { getMessageResponse }
export const chatReducer = chatSlice.reducer    