import {createReducer} from "@reduxjs/toolkit";
import {setMaxMargin, setSearch, toggleHideEDI, toggleHidePromo} from "@/ducks/filters/actions";

export interface FiltersState {
    hideEDI: boolean;
    hidePromo: boolean;
    maxMargin: string;
    search: string;
}

const initialState: FiltersState = {
    hideEDI: true,
    hidePromo: true,
    maxMargin: '0.5',
    search: '',
}

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
