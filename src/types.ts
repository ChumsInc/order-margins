import {SalesOrderType} from "chums-types/src/sales-orders";

export interface SalesOrderMarginRow {
    Company: string;
    SalesOrderNo: string;
    OrderType: SalesOrderType;
    OrderDate:  string;
    ShipExpireDate: string;
    ARDivisionNo: string;
    CustomerNo: string;
    BillToName: string;
    OrderTotal: string|number;
    ItemTotal: string|number;
    CostTotal: string|number;
    Revenue: string|number;
    Margin: string|number;
    CreatedBy: string;
    LastUpdatedBy: string;
    b2bUserID: number|null;
    b2bUserName: string|null;
    B2BCompany: string|null;
    isEDI: boolean;
    DateUpdated: string|null;
    isPromo: boolean;
}

export interface SalesOrderMarginResponse extends Omit<SalesOrderMarginRow, 'isEDI'|'isPromo'> {
    isEDI: 'Y'|'N'|null;
    isPromo: number;
}

export interface FetchOrderProps {
    company: string;
    maxMargin: string|number;
}

export interface OrderTotal {
    OrderTotal: string|number;
    ItemTotal: string|number;
    CostTotal: string|number;
    Revenue: string|number;
    Margin: string|number;
}
