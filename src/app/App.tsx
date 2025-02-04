import React from "react";

import FilterForm from "../components/FilterForm";
import {ErrorBoundary} from "react-error-boundary";
import OrdersList from "../components/OrdersList";
import Legend from "../components/Legend";
import AlertList from "@/components/alerts/AlertList";
import ErrorBoundaryFallbackAlert from "@/components/ErrorBoundaryFallbackAlert";


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
