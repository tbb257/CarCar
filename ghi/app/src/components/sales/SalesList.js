import React, { useEffect, useState } from 'react';

function SalesList(props) {
    const list = props.sales
    return(
        <table className="table table-striped">
            <thead>
                <tr>
                <th>Salesperson</th>
                <th>Employee Number</th>
                <th>Customer</th>
                <th>Automobile VIN</th>
                <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {list.map(sale => {
                return (
                    <tr key={sale.id}>
                    <td>{sale.salesperson.name}</td>
                    <td>{sale.salesperson.employee_number}</td>
                    <td>{sale.customer.name}</td>
                    <td>{sale.automobile.vin}</td>
                    <td>$ {sale.price}</td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    )
}


export default SalesList
