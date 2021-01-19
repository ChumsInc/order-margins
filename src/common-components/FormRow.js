import React from 'react';

const FormRow = ({width = 9, label, children}) => {
    const labelClassName = `col-sm-${12 - width} col-form-label`;
    const elClassName = `col-sm-${width}`;
    return (
        <div className="row mb-3">
            <label className={labelClassName}>{label}</label>
            <div className={elClassName}>
                {children}
            </div>
        </div>
    );
};

export default FormRow;
