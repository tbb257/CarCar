import React, { useEffect, useState } from 'react';

function CustomerForm() {
    //Create useState variables
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [phone_number, setPhoneNumber] = useState();

    //Create handle functions
    const handleName = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleAddress = (event) => {
        const value = event.target.value;
        setAddress(value);
    }
    const handlePhoneNumber = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    }

    //Create onSubmit function
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;
        data.address = address;
        data.phone_number = phone_number;

        const customerURL = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(customerURL, fetchConfig);
        if (response.ok){
            const newCustomer = await response.json();
            console.log(newCustomer);

            setName('');
            setAddress('');
            setPhoneNumber('');
        }
    }


    return(
    <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new customer</h1>
            <form onSubmit={handleSubmit} id="create-customer-form">
              <div className="form-floating mb-3">
                <input onChange={handleName} value={name} placeholder="name" required type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Customer name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleAddress} value={address} placeholder="fabric" required type="text" name="address" id="address" className="form-control"/>
                <label htmlFor="address">Customer Address</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handlePhoneNumber} value={phone_number} placeholder="style" required type="number" name="phone_number" id="phone_number" className="form-control"/>
                <label htmlFor="phone_number">Customer phone number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default CustomerForm
