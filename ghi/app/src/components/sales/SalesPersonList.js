import React, { useEffect, useState } from 'react';


function SalesPersonList (props) {

    // Create UseState for Sales List
    const [salesRecords, setSalesRecord] = useState([]);
    // Populate Rows of Sales
    const fetchSales = async() =>{
        const url = 'http://localhost:8090/api/sales/'
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            const record = data.sales.map((transaction) =>{
                return {
                    salesperson:transaction.salesperson.name,
                    customer:transaction.customer.name,
                    automobile:transaction.automobile.vin,
                    price:transaction.price
                };
            });

            setSalesRecord(record)
        }
    };
    useEffect(()=>{
        fetchSales();
    }, []);

    //________________________________________________________________________________________________________________________//
    //Create a filter
    const [filter, setFilter] = useState('')
    const handleFilterChange = (event) => {
        const value = event.target.value
        setFilter(value);
    }


    return (
        <div>
            <h1>Sales person history</h1>
            <form id="select-salesperson">
                <div className="mb-3">
                    <input onChange={handleFilterChange} value={filter }required id="salesperson" name="salesperson" className="form-select">
                    </input>
                </div>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sales person</th>
                        <th>Customers</th>
                        <th>VIN</th>
                        <th>Sale price</th>
                    </tr>
                </thead>
                <tbody>
                    {salesRecords.filter(transaction => transaction.salesperson.toUpperCase().includes(filter.toUpperCase())).map(transaction =>{
                        return (
                            <tr>
                                <td>{transaction.salesperson}</td>
                                <td>{transaction.customer}</td>
                                <td>{transaction.automobile}</td>
                                <td>$ {transaction.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}


export default SalesPersonList
