import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    success: null
}

const login = createAsyncThunk("user/login", async ({email, password}, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.post('/auth/login', { email, password })    
        return response.data.response.data
    }
    catch (error) {
        return rejectWithValue(error.response.data.response)
    }
})

const register = createAsyncThunk("user/signup", async ({email, password}, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.post('/auth/signup', { email, password })    
        return response.data.response.data.user
    }
    catch (error) {
        return rejectWithValue(error.response.data.response)
    }
})

const getUser = createAsyncThunk("user/getUser", async ({token} ,{rejectWithValue}) => {
    try {
        const response = await axiosInstance.post(`/auth/getUser`, {token})  
        return response.data.response.data.user
    }
    catch (error) {
        return rejectWithValue(error.response.data.response)
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
            state.isLoading = false
            state.error = null
            state.success = null
            localStorage.removeItem("token")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
            state.success = false
        })
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("token", action.payload.token)
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

export const { setUser, logout } = userSlice.actions
export { login, register, getUser }
export const userReducer = userSlice.reducer