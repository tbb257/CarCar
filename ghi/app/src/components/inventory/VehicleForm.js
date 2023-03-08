import React, { useEffect, useState } from 'react';

function VehicleForm(){

    //Populate Manufacturer Dropdown
    const [manufacturerList, setManufacturerList] = useState([]);
    const fetchData = async() =>{
        const url = "http://localhost:8100/api/manufacturers/"
        const response = await fetch(url)
        if (response.ok){
            const data = await response.json()
            setManufacturerList(data.manufacturers)
        }
    }
    useEffect(()=>{
        fetchData();
    }, []);
    //______________________________________________________________________________________________________________________//

    //Handle Event Change
    const [vehicle, setVehicle] = useState('');
    const [picture_url, setPicture] = useState('');
    const [manufacturer, setManufacturer] = useState('');

    const handleVehicleChange = (event) => {
        const value = event.target.value;
        setVehicle(value);
    }
    const handlePictureChange = (event) => {
        const value = event.target.value;
        setPicture(value);
    }
    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const data = {};
        data.name = vehicle;
        data.picture_url = picture_url;
        data.manufacturer_id = manufacturer;

        console.log(data)

        const vehicleUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(vehicleUrl, fetchConfig);
        if (response.ok){
            const newVehicle = await response.json();

            setVehicle('');
            setPicture('');
            setManufacturer('');
        }
    }
    //____________________________________________________________________________________________________________________________________//

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new Manufacturer</h1>
            <form onSubmit={handleSubmit} id="create-manufacturer-form">
              <div className="form-floating mb-3">
                <input onChange={handleVehicleChange} value={vehicle} placeholder="name" required type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Vehicle Model</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handlePictureChange} value={picture_url} placeholder="picture_url" required type="text" name="picture_url" id="picture_url" className="form-control"/>
                <label htmlFor="picture_url">Picture URL</label>
              </div>
              <div className="mb-3">
                    <select onChange={handleManufacturerChange} value={manufacturer} required id="manufacturer_id" name="manufacturer_id" className="form-select">
                        <option>Choose a Manufacturer</option>
                        {manufacturerList.map(manufacturer =>{
                            return (
                                <option key={manufacturer.id} value={manufacturer.id}>
                                    {manufacturer.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default VehicleForm;
