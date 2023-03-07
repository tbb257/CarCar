import React, { useEffect, useState } from 'react';

function SalesPersonForm(){
    //Create useState variables
    const [name, setName] = useState();
    const [employee_number, setNumber] = useState();

    //Create handle functions
    const handleName = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleNumber = (event) => {
        const value = event.target.value;
        setNumber(value);
    }

    //Create onSubmit function
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;
        data.employee_number = employee_number;

        const salesPersonURL = 'http://localhost:8090/api/salesperson/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            header:{
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(salesPersonURL, fetchConfig)
        if (response.ok){
            const newSalesPerson = await response.json();
            console.log(newSalesPerson)

            setName('');
            setNumber('');
        }
    }

    return(
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new Sales Person</h1>
            <form onSubmit={handleSubmit} id="create-customer-form">
              <div className="form-floating mb-3">
                <input onChange={handleName} value={name} placeholder="name" required type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Sales Person name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleNumber} value={employee_number} placeholder="employee_number" required type="number" name="employee_number" id="employee_number" className="form-control"/>
                <label htmlFor="employee_number">Employee Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}


export default SalesPersonForm
