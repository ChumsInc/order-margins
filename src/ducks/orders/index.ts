import {SalesOrderMarginRow} from "@/types/sales-order";
import {createReducer} from "@reduxjs/toolkit";
import {SortProps} from "chums-types";
import {defaultSort} from "./utils";
import {loadOrders, setSort} from "@/ducks/orders/actions";

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
