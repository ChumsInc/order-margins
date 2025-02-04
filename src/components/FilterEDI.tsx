import React, {useId} from 'react';
import {toggleHideEDI} from "@/ducks/filters/actions";
import FormCheck from "react-bootstrap/FormCheck";
import {useSelector} from "react-redux";
import {selectHideEDI} from "@/ducks/filters/selectors";
import {useAppDispatch} from "@/app/configureStore";

export default function FilterEDI() {
    const dispatch = useAppDispatch();
    const hideEDI = useSelector(selectHideEDI);
    const id = useId();

    return (
        <FormCheck checked={hideEDI} inline={true} type="checkbox" id={id}
                   onChange={(ev) => dispatch(toggleHideEDI(ev.target.checked))}
                   label="Hide EDI Customers"/>
    )
}
