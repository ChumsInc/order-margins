import React, {Fragment} from 'react';

const InlineFormField = ({label, children}) => {
    return (
        <Fragment>
            {!!label && (
                <label className="d-flex">{label}</label>
            )}
            {children}
        </Fragment>
    );
};

export default InlineFormField;
