import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {default as filtersReducer} from '../ducks/filters';
import ordersReducer from "../ducks/orders";
import {alertsSlice} from "@chumsinc/alert-list";

const rootReducer = combineReducers({
    [alertsSlice.reducerPath]: alertsSlice.reducer,
    filters: filtersReducer,
    orders: ordersReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default store;
