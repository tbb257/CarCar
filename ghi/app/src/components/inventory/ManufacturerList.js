import React, { useEffect, useState } from 'react';

function ManufacturerList(){

    const [manufacturers, setManufacturers] = useState([]);

    const getData = async () =>{
        const response = await fetch ("http://localhost:8100/api/manufacturers/");
        if (response.ok){
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }
    useEffect(()=>{
        getData();
    }, []);


    return (
        <table className="table table-striped">
        <thead>
            <tr>
            <th>Manufacturers</th>
            </tr>
        </thead>
        <tbody>
        {manufacturers.map(manufacturer => {
                return (
                    <tr key={manufacturer.href}>
                    <td>{manufacturer.name}</td>
                    </tr>
                    );
            })}
        </tbody>
    </table>
    )
}

export default ManufacturerList
