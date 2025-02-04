import React, {useId} from 'react';
import {toggleHidePromo} from "@/ducks/filters/actions";
import FormCheck from "react-bootstrap/FormCheck";
import {useSelector} from "react-redux";
import {selectHidePromo} from "@/ducks/filters/selectors";
import {useAppDispatch} from "@/app/configureStore";

export default function FilterPromo() {
    const dispatch = useAppDispatch();
    const hidePromo = useSelector(selectHidePromo);
    const id = useId();

    return (
        <FormCheck checked={hidePromo} inline={true} type="checkbox" id={id}
                   onChange={(ev) => dispatch(toggleHidePromo(ev.target.checked))}
                   label="Hide Promo Customers / CHUMS"/>
    )
}
