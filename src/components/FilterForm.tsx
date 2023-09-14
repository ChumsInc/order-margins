import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {FormCheck, Input, SpinnerButton} from "chums-components";
import {useAppDispatch} from "../app/configureStore";
import {
    selectHideEDI,
    selectHidePromo, selectMaxMargin,
    selectSearch,
    setSearch,
    toggleHideEDI,
    toggleHidePromo
} from "../ducks/filters";
import MaxMarginSelect from "../ducks/filters/MaxMarginSelect";
import {loadOrders, selectLoading} from "../ducks/orders";

export default function FilterForm() {
    const dispatch = useAppDispatch();
    const hideEDI = useSelector(selectHideEDI);
    const hidePromo = useSelector(selectHidePromo);
    const search = useSelector(selectSearch);
    const maxMargin = useSelector(selectMaxMargin);
    const loading = useSelector(selectLoading);

    useEffect(() => {
        dispatch(loadOrders(maxMargin));

    }, []);
    const loadHandler = () => {
        dispatch(loadOrders(maxMargin));
    }

    return (
        <div className="row g3 align-items-baseline mb-3">
            <div className="col-auto">
                Max Margin %
            </div>
            <div className="col-auto">
                <MaxMarginSelect />
            </div>
            <div className="col-auto">
                <SpinnerButton type="button" className="btn btn-sm btn-primary" onClick={loadHandler}
                               spinning={loading}>
                    Load Orders
                </SpinnerButton>
            </div>
            <div className="col"/>
            <div className="col-auto">
                <FormCheck checked={hideEDI} inline={true} type="checkbox"
                           onChange={(ev) => dispatch(toggleHideEDI(ev.target.checked))}
                           label="Hide EDI Customers"/>
            </div>
            <div className="col-auto">
                <FormCheck checked={hidePromo} inline={true} type="checkbox"
                           onChange={(ev) => dispatch(toggleHidePromo(ev.target.checked))}
                           label="Hide Promo Customers / CHUMS"/>
            </div>
            <div className="col-auto">
                <Input type="search" value={search} onChange={(ev) => setSearch(ev.target.value)}
                       bsSize="sm" placeholder="search"/>
            </div>
        </div>
    );
}
