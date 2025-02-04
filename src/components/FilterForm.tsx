import React, {useEffect, useId} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch} from "@/app/configureStore";
import {selectMaxMargin,} from "@/ducks/filters/selectors";
import MaxMarginSelect from "./MaxMarginSelect";
import {Button, Col, Row} from "react-bootstrap";
import {loadOrders} from "@/ducks/orders/actions";
import FilterEDI from "@/components/FilterEDI";
import FilterPromo from "@/components/FilterPromo";
import FilterOrders from "@/components/FilterOrders";

export default function FilterForm() {
    const dispatch = useAppDispatch();

    const maxMargin = useSelector(selectMaxMargin);
    const marginId = useId();

    useEffect(() => {
        dispatch(loadOrders(maxMargin));

    }, []);
    const loadHandler = () => {
        dispatch(loadOrders(maxMargin));
    }

    return (
        <Row gap={3} className="align-items-baseline mb-3">
            <Col xs="auto" as="label" htmlFor={marginId}>
                Max Margin %
            </Col>
            <div className="col-auto">
                <MaxMarginSelect id={marginId} size="sm"/>
            </div>
            <Col xs="auto">
                <Button type="button" variant="primary" onClick={loadHandler} size="sm">Load Orders</Button>
            </Col>
            <div className="col"/>
            <div className="col-auto">
                <FilterEDI/>
            </div>
            <div className="col-auto">
                <FilterPromo/>
            </div>
            <div className="col-auto">
                <FilterOrders/>
            </div>
        </Row>
    );
}
