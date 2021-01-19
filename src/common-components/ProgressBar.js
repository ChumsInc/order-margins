/**
 * Created by steve on 9/8/2016.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ProgressBarComponent = ({progressClassName, value, min = 0, max = 100, label, labelClassName}) => {
    const width = value > max || max === 0 ? 100 : (value / max) * 100;
    return (
        <div className={classNames('progress-bar', progressClassName)}
             role="progressbar"
             aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
             style={{width: `${width}%`}}>
            <span className={labelClassName}>{label}</span>
        </div>
    )
}

export default class ProgressBar extends PureComponent {
    static propTypes = {
        striped: PropTypes.bool,
        label: PropTypes.string,
        value: PropTypes.number,
        min: PropTypes.number,
        max: PropTypes.number,
        className: PropTypes.string,
    };

    static defaultProps = {
        striped: false,
        label: '',
        value: 100,
        min: 0,
        max: 100,
        className: 'mb-1',
    };

    render() {
        const {children, striped, label, value, min, max, className, ...rest} = this.props;
        const progressClassName = classNames('progress-bar', {
            'progress-bar-striped': striped,
            'progress-bar-animated': striped,
        });

        const labelClassName = classNames({'sr-only': !!this.props.label});
        const width = value > max || max === 0 ? 100 : (value / max) * 100;
        return (
            <div className={classNames("progress", className)} {...rest}>
                {children || <ProgressBarComponent value={value} min={min} max={max}
                                       label={label} labelClassName={labelClassName}
                                       progressClassName={progressClassName}/>}
            </div>
        );
    }
}

export {ProgressBarComponent};
