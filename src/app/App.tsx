import React from "react";
import AlertList from "../ducks/alerts/AlertList";
import FilterForm from "../components/FilterForm";
import {ErrorBoundary} from "react-error-boundary";
import ErrorBoundaryFallbackAlert from "../ducks/alerts/ErrorBoundaryFallbackAlert";
import OrdersList from "../components/OrdersList";
import Legend from "../components/Legend";


const App = () => {
    return (
        <React.StrictMode>
            <AlertList/>
            <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackAlert}>
                <FilterForm/>
                <OrdersList />
                <Legend />
            </ErrorBoundary>
        </React.StrictMode>
    )
}

export default App;
