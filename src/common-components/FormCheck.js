import React from 'react';
import classNames from 'classnames';

const FormCheck = ({label, checked, onClick, inline = false, className = {}}) => {
    return (
        <div className={classNames("form-check", className, {"form-check-inline": inline})}>
            <input type="checkbox" className="form-check-input" checked={checked} onChange={onClick}/>
            <label className="form-check-label" onClick={onClick}>
                {label}
            </label>
        </div>)
};

export default FormCheck;
