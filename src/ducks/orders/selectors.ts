import {RootState} from "@/app/configureStore";
import {createSelector} from "@reduxjs/toolkit";
import {selectHideEDI, selectHidePromo, selectSearch} from "@/ducks/filters/selectors";
import {customerKey, ordersSorter} from "@/ducks/orders/utils";

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

