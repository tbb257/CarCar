function AppointmentList(props) {

    const vip = (value) => {
        if (value) {
            return "&#9745;"
        } else {
            return "&#9744;"
        }
    }

    return (
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
            {props.appointments.map(appointment => {
              return (
                <tr scope="row" key={appointment.href}>
                  <td>{(appointment.vip) => vip(appointment.vip)}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
    )
}

export default AppointmentList;
