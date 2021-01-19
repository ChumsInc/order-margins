import {combineReducers} from 'redux';
import {FETCH_INIT, FETCH_ORDERS, FETCH_SUCCESS, SET_FILTER, SET_PAGE, SET_ROWS_PER_PAGE} from "../constants";

const loading = (state = false, action) => {
    const {type, status} = action;
    switch (type) {
    case FETCH_ORDERS:
        return status === FETCH_INIT;
    default:
        return state;
    }
};

const list = (state = [], action) => {
    const {type, orders, status} = action;
    switch (type) {
    case FETCH_ORDERS:
        if (status === FETCH_SUCCESS) {
            return [...orders];
        }
        return state;
    default:
        return state;
    }
};



export default combineReducers({
    loading,
    list,

});
