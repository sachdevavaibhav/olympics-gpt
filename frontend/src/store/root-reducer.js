import { combineReducers } from '@reduxjs/toolkit';
import { chatReducer } from './chat/chat.reducer';
import { userReducer } from './user/user.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer
})