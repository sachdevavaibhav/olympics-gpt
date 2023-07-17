import { combineReducers } from '@reduxjs/toolkit';
import { chatReducer } from './chat/chat.reducer';

export const rootReducer = combineReducers({
    chat: chatReducer
})