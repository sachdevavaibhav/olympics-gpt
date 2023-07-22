import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isLoading: false,
    error: null
}

const login = createAsyncThunk("user/login", async ({email, password}) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/auth/login`, { email, password })    
    console.log("login response", response)
    return response.data.response
})

const register = createAsyncThunk("user/register", async ({email, password}) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/auth/register`, { email, password })    
    return response.data.response.user
})

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("token", action.payload.token)
            state.user = action.payload.user
            state.isLoading = false
        })
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })

        builder.addCase(register.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoading = false
        })
        builder.addCase(register.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })
    }
})

export const { setUser } = userSlice.actions
export { login, register }
export const userReducer = userSlice.reducer