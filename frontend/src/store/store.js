import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import {logger} from "redux-logger";

const middlewares = [import.meta.env.DEV && logger].filter(Boolean);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    ).concat(middlewares)
})