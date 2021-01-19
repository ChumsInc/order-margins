import React, {Fragment, PureComponent} from 'react';
import Select from "./Select";
import FormGroup from "./FormGroup";
import PropTypes from 'prop-types';

export default class RowsPerPage extends PureComponent {
    static propTypes = {
        value: PropTypes.number,
        values: PropTypes.arrayOf(PropTypes.number),
        label: PropTypes.string,
        onChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        value: 25,
        values: [10, 25, 50, 100, 250, 500, 1000],
        label: "Rows per Page",
    };

    render() {
        const {label, value, values, onChange} = this.props;
        return (
            <Fragment>
                <label className="col-auto me-1">Rows Per Page</label>
                <div className="col-auto">
                    <Select value={value} onChange={({value}) => onChange(Number(value))} className="col-auto">
                        {values.map(value => (<option key={value} value={value}>{value}</option>))}
                    </Select>
                </div>
            </Fragment>
        )
    }
}
