import {SalesOrderMarginResponse, SalesOrderMarginRow} from "../../types";
import {fetchJSON} from "chums-components";

export async function fetchOrders(arg:string|number):Promise<SalesOrderMarginRow[]> {
    try {
        const url = `/api/sales/orders/margins/chums/${encodeURIComponent(arg)}`;
        const res = await fetchJSON<{ orders: SalesOrderMarginResponse[] }>(url, {cache: 'no-cache'})
        return (res.orders ?? []).map(row => {
            return {
                ...row,
                isEDI: row.isEDI === 'Y',
                isPromo: !!row.isPromo,
            }
        });
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchOrders()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchOrders()", err);
        return Promise.reject(new Error('Error in fetchOrders()'));
    }
}
