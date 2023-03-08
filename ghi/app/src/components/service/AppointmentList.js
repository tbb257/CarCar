// ! Need to fix filter capabilities to work for every category and only display appointments in progress.
// ! Also finish cancel/finish button capabilities

import React, {useState, useEffect} from 'react';

function AppointmentList(props) {
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

    }

    for (let status of props.appointments) {
      console.log(status.status)
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

    const handleCancel = (e) => {
      console.log('pass')
    }

    const handleFinish = (e) => {
        console.log('pass')
    }

    return (
      <>
        <div className="my-2 container" >
          <h1 className="py-2" style={{textAlign:'center'}}>List of Service Appointments</h1>
        </div>
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
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => {
              return (
                <tr scope="row" key={appointment.href}>
                  {vip(appointment.vip)}
                  <td>{appointment.vin}</td>
                  <td>{appointment.customer_name}</td>
                  <td>{date(appointment.date)}</td>
                  <td>{time(appointment.date,appointment.time)}</td>
                  <td>{appointment.technician.name}</td>
                  <td>{appointment.reason}</td>
                  <td><button onClick={handleCancel} id={[appointment.id,]} value={appointment.href} className="btn btn-danger">Cancel</button></td>
                  <td><button onClick={handleFinish} id={appointment.id} value={appointment.href} className="btn btn-success">Finish</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
}

export default AppointmentList;
