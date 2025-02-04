import {SortProps} from "chums-types";
import {SalesOrderMarginRow} from "@/types/sales-order";
import Decimal from "decimal.js";

export const customerKey = (arg:{ARDivisionNo:string, CustomerNo: string}):string => {
    return `${arg.ARDivisionNo}-${arg.CustomerNo}`.toUpperCase();
}

export const defaultSort = (a:SalesOrderMarginRow, b:SalesOrderMarginRow) => a.SalesOrderNo > b.SalesOrderNo ? 1 : -1;
export const ordersSorter = (sort:SortProps<SalesOrderMarginRow>) => (a:SalesOrderMarginRow, b:SalesOrderMarginRow):number => {
    const {field, ascending} = sort;
    const sortMod = ascending ? 1 : -1;

    switch (field) {
        case 'ARDivisionNo':
        case 'CustomerNo':
            return (customerKey(a) === customerKey(b)
                ? defaultSort(a, b)
                : (customerKey(a) > customerKey(b) ? 1 : -1)) * sortMod;

        case 'BillToName':
        case 'CreatedBy':
        case 'OrderDate':
        case 'ShipExpireDate':
            return (a[field].toUpperCase() === b[field].toUpperCase()
                ? defaultSort(a, b)
                : a[field].toUpperCase() > b[field].toUpperCase() ? 1 : -1) * sortMod;
        case 'OrderTotal':
        case 'ItemTotal':
        case 'CostTotal':
        case 'Revenue':
        case 'Margin':
            return (new Decimal(a[field]).eq(b[field])
                ? defaultSort(a, b)
                : new Decimal(a[field]).gt(b[field]) ? 1 : -1) * sortMod;
        default:
            return defaultSort(a, b) * sortMod;
    }
}
