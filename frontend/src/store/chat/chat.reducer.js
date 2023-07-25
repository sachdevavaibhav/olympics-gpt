import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
    chatId: null,
    messages: [],
    allChats: [],
    isLoading: false,
    isAllChatsLoading: false,
    isChatHistoryLoading: false,
    error: null
}

const getMessageResponse = createAsyncThunk("chat/getMessageResponse", async (query, {rejectWithValue, getState}) => {
    try {
        const chatId = getState().chat.chatId
        const response = await axiosInstance.post('/chat/query', { query, chatId })
        console.log(response)
        return response.data.response.data
    }
    catch (error) {
        return rejectWithValue(error.response.data.response)
    }
    
})

const getAllChats = createAsyncThunk("chat/all", async (_, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.get('/chat/all')
        const chats = response.data.response.data.chats.map(chat => {
            return {chatId: chat.chatId, title: chat.title}
        })
        return chats
    }
    catch (error) {
        return rejectWithValue(error.response.data.response)
    }
})

const getChatHistory = createAsyncThunk("chat/history", async (chatId, {rejectWithValue, getState}) => {
    const currentChatId = getState().chat.chatId
    console.log(currentChatId)
    if (currentChatId === chatId) return
    try {
        const response = await axiosInstance.get(`/chat/history/${chatId}`)
        return response.data.response.data
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
        },
        newChat: (state) => {
            state.chatId = null;
            state.messages = [];
            state.isLoading = false,
            state.isAllChatsLoading =false,
            state.isChatHistoryLoading = false,
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMessageResponse.pending, (state) => {
            state.isLoading = true
            state.success = false
        })
        builder.addCase(getMessageResponse.fulfilled, (state, action) => {
            // update chatId if it is null
            if (!state.chatId) {
                state.chatId = action.payload.chatId
                state.allChats = [{chatId: action.payload.chatId, title: action.meta.arg}, ...state.allChats]
            }
            // state.chatId = action.payload.chatId
            if (!action.payload.queryRes || !action.payload.queryRes.role || !action.payload.queryRes.text) {
                action.payload.queryRes = {role:"assistant", text: "Sorry, something went wrong. Please try again later."}
            }
            state.messages.push(action.payload.queryRes)
            state.isLoading = false
        })
        builder.addCase(getMessageResponse.rejected, (state, action) => {
            state.error = action.payload
            state.messages.push({role:"assistant", text: "Sorry, something went wrong. Please try again later."})
            state.isLoading = false
        })
        // getAllChats
        builder.addCase(getAllChats.pending, (state) => {
            state.isAllChatsLoading = true
            state.success = false
        })
        builder.addCase(getAllChats.fulfilled, (state, action) => {
            state.allChats = action.payload
            state.isAllChatsLoading = false
        })
        builder.addCase(getAllChats.rejected, (state, action) => {
            state.error = action.payload
            state.isAllChatsLoading = false
        })

        // getChatHistory
        builder.addCase(getChatHistory.pending, (state) => {
            state.isChatHistoryLoading = true
        })
        builder.addCase(getChatHistory.fulfilled, (state, action) => {
            if (!action.payload) return
            state.chatId = action.payload.chatId
            state.messages = action.payload.messages
            state.isChatHistoryLoading = false
        })
        builder.addCase(getChatHistory.rejected, (state, action) => {
            state.error = action.payload
            state.isChatHistoryLoading = false
        })
    }
})

export const { addMessage, newChat } = chatSlice.actions
export { getMessageResponse, getAllChats, getChatHistory }
export const chatReducer = chatSlice.reducer    