import React, {Fragment, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import numeral from 'numeral';
import classNames from 'classnames';
import {customerKey} from "@/ducks/orders/utils";
import {OrderTotal, SalesOrderMarginRow} from "@/types/sales-order";
import {SalesOrderType} from "chums-types/src/sales-orders";
import dayjs from "dayjs";
import Decimal from "decimal.js";
import {useAppDispatch} from "@/app/configureStore";
import {SortableTable, SortableTableField, TablePagination} from "@chumsinc/sortable-tables";
import {selectFilteredList, selectLoading, selectSort} from "@/ducks/orders/selectors";
import {ProgressBar} from "react-bootstrap";
import {setSort} from "@/ducks/orders/actions";

const URL_ORDER_LINK = '/reports/account/salesorder/?company=chums&salesorderno=:SalesOrderNo&view=margins';

const createdBy = ({CreatedBy, b2bUserID, b2bUserName, LastUpdatedBy}: SalesOrderMarginRow) => {
    if (b2bUserID) {
        return [b2bUserName + ' (B2B)', LastUpdatedBy].join(' / ');
    }
    if (CreatedBy === LastUpdatedBy) {
        return CreatedBy;
    }
    return [CreatedBy, LastUpdatedBy].join(' / ');
}

const SOLink = ({salesOrderNo}: { salesOrderNo: string }) => {
    const url = URL_ORDER_LINK
        .replace(':SalesOrderNo', encodeURIComponent(salesOrderNo));
    return (
        <a href={url} target="_blank" rel="noreferrer">{salesOrderNo}</a>
    )
}

const OrderType = ({orderType}: { orderType: SalesOrderType }) => {
    const className = classNames('badge', {
        'text-dark': orderType === 'S' || orderType === 'B',
        'bg-light': orderType === 'S',
        'bg-warning': orderType === 'B',
        'bg-primary': orderType !== 'S' && orderType !== 'B',
    });
    const badgeContent = (val: SalesOrderType) => {
        switch (val) {
            case 'S':
                return 'STD';
            case 'B':
                return 'B/O';
            default:
                return val;
        }
    }

    return (
        <span className={className}>{badgeContent(orderType)}</span>
    )
}

const fieldList: SortableTableField<SalesOrderMarginRow>[] = [
    {
        field: 'SalesOrderNo', title: 'Order #', sortable: true, render: (row) => <SOLink
            salesOrderNo={row.SalesOrderNo}/>
    },
    {field: 'OrderType', title: 'Type', sortable: true, render: (row) => <OrderType orderType={row.OrderType}/>},
    {field: 'ARDivisionNo', title: 'Account', sortable: true, render: customerKey},
    {field: 'BillToName', title: 'Customer Name', sortable: true,},
    {field: 'CreatedBy', title: 'User', sortable: true, render: createdBy},
    {
        field: 'OrderDate',
        title: 'Order Date',
        sortable: true,
        render: (row) => dayjs(row.OrderDate).format('MM-DD-YYYY')
    },
    {
        field: 'ShipExpireDate',
        title: 'Ship Date',
        sortable: true,
        render: (row) => dayjs(row.ShipExpireDate).format('MM-DD-YYYY')
    },
    {
        field: 'OrderTotal',
        title: 'Order Total',
        sortable: true,
        render: ({OrderTotal}) => numeral(OrderTotal).format('$0,0.00'),
        align: 'end'
    },
    {
        field: 'ItemTotal',
        title: 'Item Total',
        sortable: true,
        render: ({ItemTotal}) => numeral(ItemTotal).format('$0,0.00'),
        align: 'end'
    },
    {
        field: 'CostTotal',
        title: 'Cost Total',
        sortable: true,
        render: ({CostTotal}) => numeral(CostTotal).format('$0,0.00'),
        align: 'end'
    },
    {
        field: 'Revenue',
        title: 'Profit',
        sortable: true,
        render: ({Revenue}) => numeral(Revenue).format('$0,0.00'),
        align: 'end'
    },
    {
        field: 'Margin',
        title: 'Margin',
        sortable: true,
        render: ({Margin}) => numeral(Margin).format('0.0%'),
        align: 'end'
    },
];

const isBelowCost = (row: SalesOrderMarginRow) => {
    return new Decimal(row.Revenue).lt(0);
}

const isWarning = (row: SalesOrderMarginRow) => {
    return new Decimal(row.Margin).lt(0.333);
}

const rowClassName = (row: SalesOrderMarginRow) => {
    return {
        'table-info': row.isPromo,
        'table-danger': !row.isPromo && isBelowCost(row),
        'table-warning': !row.isPromo && isWarning(row),
    }
}

const calcTotals = (list: SalesOrderMarginRow[]): OrderTotal => {
    const totals: OrderTotal = {OrderTotal: 0, ItemTotal: 0, CostTotal: 0, Revenue: 0, Margin: 0};

    list.forEach(row => {
        totals.OrderTotal = new Decimal(totals.OrderTotal).add(row.OrderTotal).toString();
        totals.ItemTotal = new Decimal(totals.ItemTotal).add(row.ItemTotal).toString();
        totals.CostTotal = new Decimal(totals.CostTotal).add(row.CostTotal).toString();
        totals.Revenue = new Decimal(totals.Revenue).add(row.Revenue).toString();
    });
    if (new Decimal(totals.OrderTotal).gt(0)) {
        totals.Margin = new Decimal(totals.Revenue).div(totals.OrderTotal).toString();
    }
    return totals;
}

const OrderListTotal = ({total, hasMore}: { total: OrderTotal, hasMore: boolean }) => {
    return (
        <tfoot>
        {hasMore && (
            <tr>
                <th colSpan={12} className="text-end">...</th>
            </tr>
        )}
        <tr>
            <th colSpan={7} scope="row" className="text-end">Total</th>
            <td className="text-end">{numeral(total.OrderTotal).format('$0,0.00')}</td>
            <td className="text-end">{numeral(total.ItemTotal).format('$0,0.00')}</td>
            <td className="text-end">{numeral(total.CostTotal).format('$0,0.00')}</td>
            <td className="text-end">{numeral(total.Revenue).format('$0,0.00')}</td>
            <td className="text-end">{numeral(total.Margin).format('0.0%')}</td>
        </tr>
        </tfoot>
    )
}

export default function OrdersList() {
    const dispatch = useAppDispatch();
    const list = useSelector(selectFilteredList);
    const loading = useSelector(selectLoading);
    const sort = useSelector(selectSort);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [totals, setTotals] = useState<OrderTotal>(calcTotals(list))

    useEffect(() => {
        setTotals(calcTotals(list));
    }, [list]);

    const rowsPerPageChangeHandler = (rpp: number) => {
        setPage(0);
        setRowsPerPage(rpp);
    }


    return (
        <>
            {loading && <ProgressBar now={100} striped animated className="mb-1"/>}
            <SortableTable data={list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                           fields={fieldList} keyField="SalesOrderNo" size="sm" className="table-sticky"
                           rowClassName={rowClassName}
                           currentSort={sort}
                           onChangeSort={(sort) => dispatch(setSort(sort))}
                           tfoot={<OrderListTotal total={totals}
                                                  hasMore={(page * rowsPerPage + rowsPerPage) < list.length}/>}
            />
            <TablePagination page={page} onChangePage={setPage}
                             rowsPerPage={rowsPerPage} rowsPerPageProps={{onChange: rowsPerPageChangeHandler}}
                             showFirst showLast
                             count={list.length} size="sm"/>
        </>
    );
    //
    // }
}
