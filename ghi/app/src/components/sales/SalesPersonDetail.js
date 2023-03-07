import React, { useEffect, useState } from 'react';


function SalesPersonDetail (props) {

    // Create UseState for drop down menu
    const [salesPeople, salesPeopleList] = useState(['']);
    // Populate Salesperson drop down menu
    const fetchSalesPerson = async() =>{
        const url = 'http://localhost:8090/api/salesperson/'
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            salesPeopleList(data.salesperson)
        }
    }
    useEffect(()=>{
        fetchSalesPerson();
    }, []);



    return (
        <div>
            <h1>Sales person history</h1>
            <form id="select-salesperson">
                <div className="mb-3">
                    <select required id="salesperson" name="salesperson" className="form-select">
                        <option>Choose a Salesperson</option>
                        {salesPeople.map(salesperson =>{
                            return (
                                <option key={salesperson.id} value={salesperson.employee_number}>
                                    {salesperson.name}
                                </option>
                            );
                        })}
                    </select>
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
                    <tr>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}


export default SalesPersonDetail
