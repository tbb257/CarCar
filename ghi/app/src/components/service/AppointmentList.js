function AppointmentList(props) {

    const vip = (value) => {
        if (value) {
            return <td>&#9745;</td>
        } else {
            return <td>&#9744;</td>
        }
    }

    // const time = (value) => {
    //     console.log(value)
    //     let date = new Date(value)
    //     return date.toDateString()
    // }

    const handleCancel = () => {
        console.log('pass')
    }

    const handleFinish = () => {
        console.log('pass')
    }

    return (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
                <th scope="col">VIP</th>
                <th scope="col">VIN</th>
                <th scope="col">Customer Name</th>
                {/* <th scope="col">Date</th>
                <th scope="col">Time</th> */}
                <th scope="col">Technician</th>
                <th scope="col">Reason</th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {props.appointments.map(appointment => {
              return (
                <tr scope="row" key={appointment.href}>
                  {vip(appointment.vip)}
                  <td>{appointment.vin}</td>
                  <td>{appointment.customer_name}</td>
                  {/* <td>{time(appointment.date)}</td>
                  <td>{time(appointment.time)}</td> */}
                  <td>{appointment.technician.name}</td>
                  <td>{appointment.reason}</td>
                  <td><button onClick={handleCancel} className="btn btn-danger">Cancel</button></td>
                  <td><button onClick={handleFinish} className="btn btn-success">Finish</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
    )
}

export default AppointmentList;
