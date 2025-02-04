import {createAction} from "@reduxjs/toolkit";

export const setMaxMargin = createAction<string>('filters/setMaxMargin');
export const toggleHideEDI = createAction<boolean|undefined>('filters/toggleHideEDI');
export const toggleHidePromo = createAction<boolean|undefined>('filters/toggleHidePromo');
export const setSearch = createAction<string>('filters/setSearch');
