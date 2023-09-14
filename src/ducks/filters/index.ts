import {createAction, createReducer} from "@reduxjs/toolkit";
import {RootState} from "../../app/configureStore";

export interface FiltersState {
    hideEDI: boolean;
    hidePromo: boolean;
    maxMargin: string;
    search: string;
}

const initialState:FiltersState = {
    hideEDI: true,
    hidePromo: true,
    maxMargin: '0.5',
    search: '',
}

export const selectMaxMargin = (state:RootState) => state.filters.maxMargin;
export const selectHidePromo = (state:RootState) => state.filters.hidePromo;
export const selectHideEDI = (state:RootState) => state.filters.hideEDI;
export const selectSearch = (state:RootState) => state.filters.search;

export const setMaxMargin = createAction<string>('filters/setMaxMargin');
export const toggleHideEDI = createAction<boolean|undefined>('filters/toggleHideEDI');
export const toggleHidePromo = createAction<boolean|undefined>('filters/toggleHidePromo');
export const setSearch = createAction<string>('filters/setSearch');

const filtersReducer = createReducer(initialState, builder => {
    builder
        .addCase(setMaxMargin, (state, action) => {
            state.maxMargin = action.payload;
        })
        .addCase(toggleHideEDI, (state, action) => {
            state.hideEDI = action.payload ?? !state.hideEDI;
        })
        .addCase(toggleHidePromo, (state, action) => {
           state.hidePromo = action.payload ?? !state.hidePromo;
        })
        .addCase(setSearch, (state, action) => {
            state.search = action.payload;
        })
});

export default filtersReducer;
