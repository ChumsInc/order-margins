import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {SortProps} from "chums-types";
import {SalesOrderMarginRow} from "@/types/sales-order";
import {fetchOrders} from "@/ducks/orders/api";
import {RootState} from "@/app/configureStore";
import {selectLoading} from "@/ducks/orders/selectors";

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
