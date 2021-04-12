export const FETCH_INIT = 'FETCH_INIT';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const SET_ALERT = 'SET_ALERT';
export const DISMISS_ALERT = 'DISMISS_ALERT';

export const FETCH_ORDERS = 'FETCH_ORDERS';

export const SET_COMPANY = 'SET_COMPANY';
export const SET_MAX_MARGIN = 'SET_MAX_MARGIN';
export const TOGGLE_FILTER_EDI = 'TOGGLE_FILTER_EDI';
export const TOGGLE_FILTER_PROMO = 'TOGGLE_FILTER_PROMO';
export const SET_PAGE = 'SET_PAGE';
export const SET_ROWS_PER_PAGE = 'SET_ROWS_PER_PAGE';
export const SET_FILTER = 'SET_FILTER';

export const URL_ORDERS = '/api/sales/orders/margins/:company/:maxMargin';
export const URL_ORDER_LINK = '/reports/account/salesorder/?company=:CompanyCode&salesorderno=:SalesOrderNo&view=margins';

export const PROMO_CUSTOMERS = ['PROMOS', 'SAMPLES', 'CHUMS', 'TEST'];
