import {combineReducers} from 'redux';
import {
    FETCH_ORDERS, FETCH_SUCCESS,
    SET_COMPANY,
    SET_FILTER,
    SET_MAX_MARGIN, SET_PAGE,
    SET_ROWS_PER_PAGE,
    TOGGLE_FILTER_EDI,
    TOGGLE_FILTER_PROMO
} from "../constants";

const company = (state = 'chums', action) => {
    const {type, company} = action;
    switch (type) {
    case SET_COMPANY:
        return company;
    default:
        return state;
    }
};

const maxMargin = (state = '0.5', action) => {
    const {type, maxMargin} = action;
    switch (type) {
    case SET_MAX_MARGIN:
        return maxMargin;
    default:
        return state;
    }
};

const filterEDI = (state = true, action) => {
    const {type} = action;
    switch (type) {
    case TOGGLE_FILTER_EDI:
        return !state;
    default:
        return state;
    }
};

const filterPromo = (state = true, action) => {
    const {type} = action;
    switch (type) {
    case TOGGLE_FILTER_PROMO:
        return !state;
    default:
        return state;
    }
};


const filter = (state = '', action) => {
    const {type, filter} = action;
    switch (type) {
    case SET_FILTER:
        return filter;
    default:
        return state;
    }
};

const rowsPerPage = (state = 25, action) => {
    const {type, rowsPerPage} = action;
    switch (type) {
    case SET_ROWS_PER_PAGE:
        return rowsPerPage;
    default:
        return state;
    }
};

const page = (state = 1, action) => {
    const {type, page, status} = action;
    switch (type) {
    case SET_PAGE:
        return page;
    case SET_FILTER:
    case TOGGLE_FILTER_PROMO:
    case TOGGLE_FILTER_EDI:
        return 1;
    case FETCH_ORDERS:
        return status === FETCH_SUCCESS ? 1 : state;
    default:
        return state;
    }
};


export default combineReducers({
    company,
    maxMargin,
    filterPromo,
    filterEDI,
    rowsPerPage,
    page,
    filter,
})
