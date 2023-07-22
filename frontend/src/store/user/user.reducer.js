import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    success: null
}

const login = createAsyncThunk("user/login", async ({email, password}, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/auth/login`, { email, password })    
        console.log("login response", response)
        return response.data.response.data
    }
    catch (error) {
        return rejectWithValue(error.response.data.response)
    }
})

const register = createAsyncThunk("user/register", async ({email, password}, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/auth/register`, { email, password })    
        return response.data.response.data.user
    }
    catch (error) {
        return rejectWithValue(error.response.data.response)
    }
})

const getUser = createAsyncThunk("user/getUser", async ({token} ,{rejectWithValue}) => {
    try {
        console.log("token", token)
        const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/auth/getUser`, {token})  
        console.log("getUser response", response) 
        return response.data.response.data.user
    }
    catch (error) {
        console.log("error", error)
        return rejectWithValue(error.response.data.response)
    }
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
            state.success = false
        })
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("token", action.payload.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`
            state.user = action.payload.user
            state.isLoading = false
            state.success = true
        })
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })

        builder.addCase(register.pending, (state) => {
            state.isLoading = true
            state.success = false
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoading = false
            state.success = true
        })
        builder.addCase(register.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })
        
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true
            state.success = false
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoading = false
            state.success = true
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })
    }
})

export const { setUser } = userSlice.actions
export { login, register, getUser }
export const userReducer = userSlice.reducer