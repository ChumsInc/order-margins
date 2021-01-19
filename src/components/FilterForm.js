import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {setCompany, setMaxMargin, toggleFilterEDI, toggleFilterPromo, setFilter} from '../actions/settings';
import {fetchOrders} from "../actions/orders";
import FormGroup from "../common-components/FormGroup";
import FormCheck from "../common-components/FormCheck";
import FormGroupTextInput from "../common-components/FormGroupTextInput";
import TextInput from "../common-components/TextInput";


function mapStateToProps({settings}) {
    const {filterPromo, filterEDI, filter} = settings;
    return {
        filterPromo,
        filterEDI,
        filter,
    };
}

const mapDisaptchToProps = {
    toggleFilterEDI,
    toggleFilterPromo,
    setFilter,
};


class FilterForm extends Component {
    static propTypes = {
        filterEDI: PropTypes.bool,
        filterPromo: PropTypes.bool,
        filter: PropTypes.string,
        toggleFilterPromo: PropTypes.func.isRequired,
        toggleFilterEDI: PropTypes.func.isRequired,
        setFilter: PropTypes.func.isRequired,
    };
    static defaultProps = {
        filterEDI: true,
        filterPromo: true,
        filter: '',
        loading: false,
    };

    render() {
        const {filter, filterEDI, filterPromo} = this.props;
        return (
            <div className="row row-cols-sm-auto g3 align-items-center mb-3">
                <div className="col-12">
                    <FormCheck checked={filterEDI} inline={true} onClick={this.props.toggleFilterEDI}
                               label="Hide EDI Customers" />
                </div>
                <div className="col-12">
                    <FormCheck checked={filterPromo} inline={true} onClick={this.props.toggleFilterPromo}
                               label="Hide Promo Customers / CHUMS" />
                </div>
                <div className="col-12">
                    <TextInput type="search" value={filter} onChange={({value}) => this.props.setFilter(value)} placeholder="search"/>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, mapDisaptchToProps
)(FilterForm);
