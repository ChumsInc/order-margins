import {
    SET_COMPANY, SET_FILTER,
    SET_MAX_MARGIN,
    SET_PAGE,
    SET_ROWS_PER_PAGE,
    TOGGLE_FILTER_EDI,
    TOGGLE_FILTER_PROMO
} from "../constants";

export const setCompany = (company) => ({type: SET_COMPANY, company});
export const setMaxMargin = (maxMargin) => ({type: SET_MAX_MARGIN, maxMargin});
export const toggleFilterEDI = () => ({type: TOGGLE_FILTER_EDI});
export const toggleFilterPromo = () => ({type: TOGGLE_FILTER_PROMO});
export const setPage = (page) => ({type: SET_PAGE, page});
export const setRowsPerPage = (rowsPerPage) => ({type: SET_ROWS_PER_PAGE, rowsPerPage});
export const setFilter = (filter) => ({type: SET_FILTER, filter});
