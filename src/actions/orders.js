import {buildPath, fetchGET} from "./fetch";
import {FETCH_FAILURE, FETCH_INIT, FETCH_ORDERS, FETCH_SUCCESS, URL_ORDERS} from "../constants";
import {setAlert} from "./app";

export const fetchOrders = () => async (dispatch, getState) => {
    const {orders, settings} = getState();
    if (orders.loading) {
        return;
    }
    try {
        const {company, maxMargin, filterEDI, filterPromo} = settings;
        dispatch({type: FETCH_ORDERS, status: FETCH_INIT});
        const url = buildPath(URL_ORDERS, {company, maxMargin});
        const {orders} = await fetchGET(url, {cache: 'no-cache'});
        dispatch({type: FETCH_ORDERS, status: FETCH_SUCCESS, orders});
    } catch(err) {
        console.log("fetchOrders()", err.message);
        setAlert({message: err.message});
        dispatch({type: FETCH_ORDERS, status: FETCH_FAILURE});
    }
}

