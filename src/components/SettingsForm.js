import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {setCompany, setMaxMargin, toggleFilterEDI, toggleFilterPromo} from '../actions/settings';
import {fetchOrders} from '../actions/orders';
import FormGroup from "../common-components/FormGroup";
import Select from "../common-components/Select";
import FormCheck from "../common-components/FormCheck";
import FormRow from "../common-components/FormRow";
import InlineFormField from "../common-components/InlineFormField";


function mapStateToProps({orders, settings}) {
    const {company, maxMargin, filterEDI, filterPromo} = settings;
    const {loading} = orders;
    return {company, maxMargin, filterPromo, filterEDI, loading};
}

const mapDisaptchToProps = {
    setCompany,
    setMaxMargin,
    toggleFilterEDI,
    toggleFilterPromo,
    fetchOrders,
};

class SettingsForm extends Component {
    static propTypes = {
        company: PropTypes.string,
        maxMargin: PropTypes.string,
        filterEDI: PropTypes.bool,
        filterPromo: PropTypes.bool,
        loading: PropTypes.bool,
        setCompany: PropTypes.func.isRequired,
        setMaxMargin: PropTypes.func.isRequired,
        toggleFilterPromo: PropTypes.func.isRequired,
        toggleFilterEDI: PropTypes.func.isRequired,
        fetchOrders: PropTypes.func.isRequired,
    };
    static defaultProps = {
        company: 'chums',
        maxMargin: '0.5',
        filterEDI: true,
        filterPromo: true,
        loading: false,
    };

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        // this.props.fetchOrders();
    }


    onSubmit(ev) {
        ev.preventDefault();
        this.props.fetchOrders();
    }

    render() {
        const {maxMargin, loading} = this.props;
        return (
            <form className="row row-cols-sm-auto g3 align-items-center mb-3" onSubmit={this.onSubmit}>
                <label>Max Margin %</label>
                <div className="col-12">
                    <Select value={maxMargin}
                            onChange={({value}) => this.props.setMaxMargin(value)}>
                        <option value="1">ALL</option>
                        <option value="0.9">90%</option>
                        <option value="0.75">75%</option>
                        <option value="0.66">66%</option>
                        <option value="0.5">50%</option>
                        <option value="0.33">33%</option>
                        <option value="0.25">25%</option>
                        <option value="0.1">10%</option>
                    </Select>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-sm btn-primary" disabled={loading}>
                        Load Orders
                    </button>
                </div>
            </form>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDisaptchToProps,
)(SettingsForm);
