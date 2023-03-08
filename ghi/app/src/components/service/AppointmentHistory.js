// ! Need to fix filter capabilities.

import React, {useState, useEffect} from 'react';

function AppointmentHistory(props) {
    const [appointments, setAppointments] = useState([])
    const [filterTerm, setFilterTerm] = useState(" ")
    const [filterCategory, setFilterCategory] = useState("")


    useEffect(() => {
      setAppointments(props.appointments);
    }, [])

    const handleFilterCategoryChange = (e) => {
      setFilterCategory(e.target.value);
    }

    const handelFilterTermChange = (e) => {
      setFilterTerm(e.target.value);
    }

    const appointmentsFiltered = () => {
      if (filterTerm === " ") {
        return appointments.filter((appointment) => appointment.status.name !== "IN PROGRESS")
      } else {
        return appointments.filter((appointment) => appointment[filterCategory].toLowerCase().includes(filterTerm.toLowerCase()));
          // console.log(technicians["name"])
          // if (filterCategory === "technician") {
          //   return appointments.filter(() => technicians["name"].includes(filterTerm));
          // } else {
          //     return appointments.filter((appointment) => appointment[filterCategory].toLowerCase().includes(filterTerm.toLowerCase()));
          // }
      }
    }

    const vip = (value) => {
        if (value) {
            return <td>&#9745;</td>
        } else {
            return <td>&#9744;</td>
        }
    }

    const date = (value) => {
      let date = new Date(value)
      return date.toDateString()
    }

    const time = (value, value2) => {
        let dateString = `${value}T${value2}`
        let date = new Date(dateString)
        return date.toLocaleTimeString()
    }

    return (
      <>
        <div className="my-2 container" >
          <h1 className="py-2" style={{textAlign:'center'}}>VIN Service History</h1>
        </div>
        <hr/>
        <form id="appointment_filter">
          <div className="row">
            <select className="col-md-3" value={filterCategory} placeholder="Filter Category" onChange={handleFilterCategoryChange}>
              <option value="vin">VIN</option>
            </select>
            <input className="col-md-9" onChange={handelFilterTermChange}></input>
          </div>
        </form>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
                <th scope="col">VIP</th>
                <th scope="col">VIN</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Technician</th>
                <th scope="col">Reason</th>
            </tr>
          </thead>
          <tbody>
            {appointmentsFiltered().map(appointment => {
              return (
                <tr scope="row" key={appointment.href}>
                  {vip(appointment.vip)}
                  <td>{appointment.vin}</td>
                  <td>{appointment.customer_name}</td>
                  <td>{date(appointment.date)}</td>
                  <td>{time(appointment.date,appointment.time)}</td>
                  <td>{appointment.technician.name}</td>
                  <td>{appointment.reason}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
}

export default AppointmentHistory;
