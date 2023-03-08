import React, {useState, useEffect} from 'react';

function AppointmentList(props) {
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
      setAppointments((props.appointments).filter(appointment => appointment.status === "IN PROGRESS"));
    }, [])

    const vip = (value) => {
        if (value) {
            return <td className="table-sucess">&#9745;</td>
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

    const handleCancel = async (e) => {
        const appointmentURL = `http://localhost:8080${e.target.value}`

        const eArray = e.target.id.split(",")

        const formData = {
            vin: eArray[0],
            customer_name: eArray[1],
            reason: eArray[2],
            date: eArray[3],
            time: eArray[4],
            technician: eArray[5],
            status: "CANCELLED"
        }

        console.log(formData)

        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(appointmentURL, fetchConfig);

        if (response.ok) {
            setAppointments((props.appointments).filter(appointment => appointment.status === "IN PROGRESS"))
            window.location.reload(true)
            console.log("SUCCESS")
        }
    }

    const handleFinish = async (e) => {
      const appointmentURL = `http://localhost:8080${e.target.value}`

      const eArray = e.target.id.split(",")

      const formData = {
          vin: eArray[0],
          customer_name: eArray[1],
          reason: eArray[2],
          date: eArray[3],
          time: eArray[4],
          technician: eArray[5],
          status: "FINISHED"
      }

      console.log(formData)

      const fetchConfig = {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
              "Content-Type": "application/json"
          }
      };

      const response = await fetch(appointmentURL, fetchConfig);

      if (response.ok) {
          setAppointments((props.appointments).filter(appointment => appointment.status === "IN PROGRESS"))
          window.location.reload(true)
      }
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
                  <td><button onClick={handleCancel} id={[appointment.vin, appointment.customer_name, appointment.reason, appointment.date, appointment.time, appointment.technician.employee_num]} value={appointment.href} className="btn btn-danger">Cancel</button></td>
                  <td><button onClick={handleFinish} id={[appointment.vin, appointment.customer_name, appointment.reason, appointment.date, appointment.time, appointment.technician.employee_num]} value={appointment.href} className="btn btn-success">Finish</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
}

export default AppointmentList;
