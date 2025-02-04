import React, {ChangeEvent} from 'react';
import {useAppDispatch} from "@/app/configureStore";
import {useSelector} from "react-redux";
import {setMaxMargin} from "@/ducks/filters/actions";
import {FormSelect, FormSelectProps} from "react-bootstrap";
import {selectMaxMargin} from "@/ducks/filters/selectors";

export default function MaxMarginSelect(props: Omit<FormSelectProps, 'value' | 'onChange'>) {
    const dispatch = useAppDispatch();
    const maxMargin = useSelector(selectMaxMargin);

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setMaxMargin(ev.target.value));
    }
    return (
        <FormSelect value={maxMargin} onChange={changeHandler} {...props}>
            <option value="1">ALL</option>
            <option value="0.9">90%</option>
            <option value="0.75">75%</option>
            <option value="0.66">66%</option>
            <option value="0.5">50%</option>
            <option value="0.33">33%</option>
            <option value="0.25">25%</option>
            <option value="0.1">10%</option>
        </FormSelect>
    )
}
