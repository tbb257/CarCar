import React, {useState, useEffect} from 'react';

function AppointmentHistory(props) {
    const [appointments, setAppointments] = useState([])
    const [filterTerm, setFilterTerm] = useState("")


    useEffect(() => {
      setAppointments(props.appointments);
    }, [])

    const handleFilterTermChange = (e) => {
      setFilterTerm(e.target.value);
    }

    const appointmentsFiltered = () => {
      if (filterTerm === "") {
        return appointments
      } else {
        return appointments.filter((appointment) => appointment.vin.toLowerCase().includes(filterTerm.toLowerCase()));
      }
    }

    const vip = (vip) => {
        if (vip) {
            return <td>&#9745;</td>
        } else {
            return <td>&#9744;</td>
        }
    }

    const date = (date) => {
      let dateData = new Date(date)
      return dateData.toDateString()
    }

    const time = (date, time) => {
        let dateString = `${date}T${time}`
        let timeData = new Date(dateString)
        return timeData.toLocaleTimeString()
    }

    return (
      <>
        <div className="my-2 container" >
          <h1 className="py-2" style={{textAlign:'center'}}>VIN Service History</h1>
        </div>
        <hr/>
        <form id="appointment_filter">
          <div className="row">
            <input className="col-md-12" onChange={handleFilterTermChange} placeholder="Search by VIN"></input>
          </div>
        </form>
        <hr/>
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
