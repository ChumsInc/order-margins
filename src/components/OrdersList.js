import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {setPage, setRowsPerPage} from '../actions/settings';
import SortableTable from "../common-components/SortableTable";
import ProgressBar from "chums-components/src/ProgressBar";
import formatDate from 'date-fns/format';
import numeral from 'numeral';
import {URL_ORDER_LINK} from "../constants";
import {companyCode} from "../utils";
import classNames from 'classnames';

function mapStateToProps({orders, settings}) {
    const {loading, list} = orders;
    const {rowsPerPage, page, filter, filterEDI, filterPromo} = settings;
    return {loading, list, rowsPerPage, page, filter, filterEDI, filterPromo};
}

const mapDispatchToProps = {
    setPage,
    setRowsPerPage,
}

const accountNumber = ({ARDivisionNo, CustomerNo}) => `${ARDivisionNo}-${CustomerNo}`;
const createdBy = ({CreatedBy, b2bUserID, b2bUserName, LastUpdatedBy}) => {
    if (b2bUserID) {
        return [b2bUserName + ' (B2B)', LastUpdatedBy].join(' / ');
    }
    if (CreatedBy === LastUpdatedBy) {
        return CreatedBy;
    }
    return [CreatedBy, LastUpdatedBy].join(' / ');
}

const SOLink = ({Company, SalesOrderNo}) => {
    const url = URL_ORDER_LINK
        .replace(':CompanyCode', encodeURIComponent(companyCode(Company)))
        .replace(':SalesOrderNo', encodeURIComponent(SalesOrderNo));
    return (
        <a href={url} target="_blank">{SalesOrderNo}</a>
    )
}

const OrderType = ({OrderType}) => {
    const className = classNames('badge', {
        'text-dark': OrderType === 'S' || OrderType === 'B',
        'bg-light': OrderType === 'S',
        'bg-warning': OrderType === 'B',
        'bg-primary': OrderType !== 'S' && OrderType !== 'B',
    });
    const badgeContent = (val) => {
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
        <span className={className}>{badgeContent(OrderType)}</span>
    )
}

const fieldList = [
    {field: 'SalesOrderNo', title: 'Order #', render: (row) => <SOLink {...row} />},
    {field: 'OrderType', title: 'Type', render: (row) => <OrderType {...row} />},
    {field: 'ARDivisionNo', title: 'Account', render: accountNumber, sortFn: accountNumber},
    {field: 'BillToName', title: 'Customer Name', sortFn: ({BillToName}) => BillToName.toLowerCase()},
    {field: 'CreatedBy', title: 'User', render: createdBy},
    {field: 'OrderDate', title: 'Order Date', render: (row) => formatDate(new Date(row.OrderDate), 'MM-dd-y')},
    {field: 'ShipExpireDate', title: 'Ship Date', render: (row) => formatDate(new Date(row.ShipExpireDate), 'MM-dd-y')},
    {
        field: 'OrderTotal',
        title: 'Order Total',
        render: ({OrderTotal}) => numeral(OrderTotal).format('$0,0.00'),
        className: 'right'
    },
    {
        field: 'ItemTotal',
        title: 'Item Total',
        render: ({ItemTotal}) => numeral(ItemTotal).format('$0,0.00'),
        className: 'right'
    },
    {
        field: 'CostTotal',
        title: 'Cost Total',
        render: ({CostTotal}) => numeral(CostTotal).format('$0,0.00'),
        className: 'right'
    },
    {field: 'Revenue', title: 'Revenue', render: ({Revenue}) => numeral(Revenue).format('$0,0.00'), className: 'right'},
    {field: 'Margin', title: 'Margin', render: ({Margin}) => numeral(Margin).format('0.0%'), className: 'right'},
    // {field: 'isPromo', title: 'Promo?', render: ({isPromo}) => isPromo === 1 ? 'Y' : '-'},
];

const isPromo = (row) => {
    return row.isPromo === 1;
}

const isBelowCost = (row) => {
    return row.Revenue < 0;
}

const isWarning = (row) => {
    return row.Margin < 0.333;
}

const rowClassName = (row) => {
    return {
        'table-info': isPromo(row),
        'table-danger': !isPromo(row) && isBelowCost(row),
        'table-warning': !isPromo(row) && isWarning(row),
    }
}

class OrdersList extends Component {
    static propTypes = {
        loading: PropTypes.bool,
        list: PropTypes.array,
        rowsPerPage: PropTypes.number,
        page: PropTypes.number,
        filterEDI: PropTypes.bool,
        filterPromo: PropTypes.bool,
        filter: PropTypes.string,
        setPage: PropTypes.func.isRequired,
        setRowsPerPage: PropTypes.func.isRequired,
    }
    static defaultProps = {
        loading: false,
        filterEDI: true,
        filterPromo: true,
        list: [],
        rowsPerPage: 25,
        page: 1,

    }

    render() {
        const {loading, list, rowsPerPage, page, filter, filterEDI, filterPromo} = this.props;
        let reFilter = /^/;
        try {
            reFilter = new RegExp('\\b' + filter, 'i');
        } catch (e) {
        }
        const data = list
            .filter(row => !filter || reFilter.test(row.SalesOrderNo)
                || reFilter.test(row.BillToName)
                || reFilter.test(accountNumber(row))
                || reFilter.test(createdBy(row)))
            .filter(row => !filterEDI || row.isEDI !== 'Y')
            .filter(row => !filterPromo || row.isPromo === 0);
        const totals = {OrderTotal: 0, ItemTotal: 0, CostTotal: 0, Revenue: 0, Margin: 0};
        data.forEach(row => {
            totals.OrderTotal += row.OrderTotal;
            totals.ItemTotal += row.ItemTotal;
            totals.CostTotal += row.CostTotal;
            totals.Revenue += row.Revenue;
        });
        if (totals.OrderTotal > 0) {
            totals.Margin = totals.Revenue / totals.OrderTotal;
        }
        return (
            <Fragment>
                {loading && <ProgressBar striped={true} className="mb-1"/>}
                <SortableTable data={data} fields={fieldList} keyField="SalesOrderNo"
                               rowClassName={rowClassName}
                               defaultSort="Margin"
                               onChangeSort={() => this.props.setPage(1)}
                               page={page} onChangePage={this.props.setPage}
                               rowsPerPage={rowsPerPage}
                               onChangeRowsPerPage={this.props.setRowsPerPage}
                               hasFooter={true}
                               footerData={[totals]}/>
            </Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrdersList);
