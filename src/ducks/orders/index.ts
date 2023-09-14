import {SalesOrderMarginRow} from "../../types";
import {createAction, createAsyncThunk, createReducer, createSelector} from "@reduxjs/toolkit";
import {fetchOrders} from "./api";
import {SortProps} from "chums-components";
import {customerKey, defaultSort, ordersSorter} from "./utils";
import {RootState} from "../../app/configureStore";
import {selectHideEDI, selectHidePromo, selectSearch} from "../filters";

export interface OrdersState {
    list: SalesOrderMarginRow[];
    loading: boolean;
    sort: SortProps<SalesOrderMarginRow>
}

const initialState: OrdersState = {
    list: [],
    loading: false,
    sort: {field: 'Margin', ascending: true},
}

export const setSort = createAction<SortProps<SalesOrderMarginRow>>('orders/setSort');
export const loadOrders = createAsyncThunk<SalesOrderMarginRow[], string | number>(
    'orders/load',
    async (arg) => {
        return await fetchOrders(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !selectLoading(state);
        }
    }
)

export const selectList = (state: RootState) => state.orders.list;
export const selectLoading = (state: RootState) => state.orders.loading;
export const selectSort = (state: RootState) => state.orders.sort;

export const selectFilteredList = createSelector(
    [selectList, selectSort, selectSearch, selectHidePromo, selectHideEDI],
    (list, sort, search, hidePromo, hideEDI) => {
        return list
            .filter(row => !hidePromo || !row.isPromo)
            .filter(row => !hideEDI || !row.isEDI)
            .filter(row => {
                return !search.trim()
                    || customerKey(row).includes(search.toUpperCase())
                    || row.SalesOrderNo.toUpperCase().includes(search.toUpperCase())
                    || row.BillToName.toLowerCase().includes(search.toLowerCase());
            })
            .sort(ordersSorter(sort));
    }
)


const ordersReducer = createReducer(initialState, builder => {
    builder
        .addCase(loadOrders.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload.sort(defaultSort);
        })
        .addCase(loadOrders.rejected, (state) => {
            state.loading = false;
        })
        .addCase(setSort, (state, action) => {
            state.sort = action.payload;
        })
})

export default ordersReducer;
