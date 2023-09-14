import React, {ChangeEvent} from 'react';
import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {selectMaxMargin, setMaxMargin} from "./index";

export default function MaxMarginSelect() {
    const dispatch = useAppDispatch();
    const maxMargin = useSelector(selectMaxMargin);

    const changeHandler = (ev:ChangeEvent<HTMLSelectElement>) => {
        dispatch(setMaxMargin(ev.target.value));
    }
    return (
        <select className="form-select form-select-sm" value={maxMargin} onChange={changeHandler}>
            <option value="1">ALL</option>
            <option value="0.9">90%</option>
            <option value="0.75">75%</option>
            <option value="0.66">66%</option>
            <option value="0.5">50%</option>
            <option value="0.33">33%</option>
            <option value="0.25">25%</option>
            <option value="0.1">10%</option>
        </select>
    )
}
