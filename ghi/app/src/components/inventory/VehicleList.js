import React, { useEffect, useState } from 'react';

function VehicleList(){
    const [vehicles, setVehicles] = useState([]);

    const getData = async () =>{
        const response = await fetch ("http://localhost:8100/api/models/");
        if (response.ok){
            const data = await response.json();
            setVehicles(data.models);
        }
    }
    useEffect(()=>{
        getData();
    }, []);


    return (
    <table className="table table-striped">
        <thead>
            <tr>
            <th>Vehicles</th>
            <th>Manufacturer</th>
            <th>Reference</th>
            </tr>
        </thead>
        <tbody>
        {vehicles.map(model => {
                return (
                    <tr key={model.href}>
                    <td>{model.name}</td>
                    <td>{model.manufacturer.name}</td>
                    <td><img src={model.picture_url} height="100 px"/></td>
                    </tr>
                    );
            })}
        </tbody>
    </table>
    )
}

export default VehicleList
