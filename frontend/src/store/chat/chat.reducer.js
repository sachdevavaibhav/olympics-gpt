import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
    messages: [],
    isLoading: false,
    error: null
}

const getMessageResponse = createAsyncThunk("chat/getMessageResponse", async (query, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.post('/query', { query })
        return response.data.response.data.queryRes
    }
    catch (error) {
        return rejectWithValue(error.response.data.response)
    }
    
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
            state.error = action
            state.messages.push({role:"assistant", text: "Sorry, something went wrong. Please try again later."})
            state.isLoading = false
        })
    }
})

export const { addMessage } = chatSlice.actions
export { getMessageResponse }
export const chatReducer = chatSlice.reducer    