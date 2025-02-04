import {RootState} from "@/app/configureStore";

export const selectMaxMargin = (state:RootState) => state.filters.maxMargin;
export const selectHidePromo = (state:RootState) => state.filters.hidePromo;
export const selectHideEDI = (state:RootState) => state.filters.hideEDI;
export const selectSearch = (state:RootState) => state.filters.search;
