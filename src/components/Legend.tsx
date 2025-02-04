import React from "react";
import Alert from "react-bootstrap/Alert";

export default function Legend() {
    return (
        <div className="container">
            <Alert variant="info" title="INFO">
                The cost, revenue and margins on this report are estimates and may change
                based on production, purchasing, receiving, or any other transaction that
                affects average costs.
            </Alert>
            <table className="table table-xs" style={{maxWidth: '15rem', captionSide: 'top'}}>
                <caption>Legend</caption>
                <tbody>
                <tr>
                    <th className="table-info">Promo Account or GL Codes</th><td className="table-info">&nbsp;</td>
                </tr>
                <tr>
                    <th className="table-warning">Below 33.3% Margin</th><td className="table-warning">&nbsp;</td>
                </tr>
                <tr>
                    <th className="table-danger">Revenue less than $0.00</th><td className="table-danger">&nbsp;</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
