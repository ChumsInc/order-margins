import React from "react";

import FilterForm from "../components/FilterForm";
import {ErrorBoundary} from "react-error-boundary";
import OrdersList from "../components/OrdersList";
import Legend from "../components/Legend";
import AppAlertList from "@/components/AppAlertList";
import ErrorBoundaryFallbackAlert from "@/components/ErrorBoundaryFallbackAlert";


const App = () => {
    return (
        <React.StrictMode>
            <AppAlertList/>
            <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackAlert}>
                <FilterForm/>
                <OrdersList />
                <Legend />
            </ErrorBoundary>
        </React.StrictMode>
    )
}

export default App;
