import React, {ChangeEvent} from 'react';
import {setSearch} from "@/ducks/filters/actions";
import {FormControl} from "react-bootstrap";
import {useAppDispatch} from "@/app/configureStore";
import {useSelector} from "react-redux";
import {selectSearch} from "@/ducks/filters/selectors";

export default function FilterOrders() {
    const dispatch = useAppDispatch();
    const search = useSelector(selectSearch);

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(ev.target.value));
    }

    return (
        <FormControl type="search" value={search} onChange={changeHandler}
                     size="sm" placeholder="search"/>
    )
}
