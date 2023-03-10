import React, { useState } from 'react';

function ManufacturerForm(){
    const [manufacturer, setManufacturer] = useState('');
    const handleManufacturerChange = (e) =>{
        const value = e.target.value;
        setManufacturer(value);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const data = {}
        data.name = manufacturer

        const manufacturerURL = "http://localhost:8100/api/manufacturers/"
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            header:{
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch(manufacturerURL, fetchConfig)
        if (response.ok){
            const newManufacturer = await response.json();
            setManufacturer('');
        }
    }

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new Manufacturer</h1>
            <form onSubmit={handleSubmit} id="create-customer-form">
              <div className="form-floating mb-3">
                <input onChange={handleManufacturerChange} value={manufacturer} placeholder="name" required type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Name</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default ManufacturerForm
