import React, { useEffect, useState } from 'react';

function AutomobileList() {
    const [automobiles, setAutomobiles] = useState([])

    const getData = async () => {
      const response = await fetch("http://localhost:8100/api/automobiles/")

      if (response.ok) {
          const data = await response.json()
          setAutomobiles(data.autos);
      }
    }

    useEffect(() => {
      getData();
    }, [])


    return (
      <>
        <div className="my-2 container" >
          <h1 className="py-2" style={{textAlign:'center'}}>List of Automobiles</h1>
        </div>
        <hr/>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
                <th scope="col">VIN</th>
                <th scope="col">Color</th>
                <th scope="col">Year</th>
                <th scope="col">Model</th>
                <th scope="col">Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            {automobiles.map(auto => {
              return (
                <tr scope="row" key={auto.href}>
                  <td>{auto.vin}</td>
                  <td>{auto.color}</td>
                  <td>{auto.year}</td>
                  <td>{auto.model.name}</td>
                  <td>{auto.model.manufacturer.name}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
}

export default AutomobileList;
