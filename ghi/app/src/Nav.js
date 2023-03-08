import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <div className="dropdown">
              <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Manufacturers
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <NavLink className="dropdown-item" to="manufacturers">List of Manufacturers</NavLink>
                <NavLink className="dropdown-item" to="manufacturers/create/">Add a Manufacturer</NavLink>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <div className="dropdown">
              <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Vehicles
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <NavLink className="dropdown-item" to="vehicles">List of Vehicles</NavLink>
              <NavLink className="dropdown-item" to="vehicles/create/">Add a Vehicle Models</NavLink>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <div className="dropdown">
              <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Automobiles
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <NavLink className="dropdown-item" to="automobiles">List of Automobiles</NavLink>
              <NavLink className="dropdown-item" to="automobiles/create/">Add an Automobile</NavLink>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <div className="dropdown">
              <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Services
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <NavLink className="dropdown-item" to="service">List of Appointments</NavLink>
                <NavLink className="dropdown-item" to="service/create/">Add an Appointment</NavLink>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <div className="dropdown">
              <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sales
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <NavLink className="dropdown-item" to="sales">List of Sales</NavLink>
                <NavLink className="dropdown-item" to="sales/create/">Create a Sale Record</NavLink>
                <NavLink className="dropdown-item" to="salesperson">View a Sales Person's History</NavLink>
                <NavLink className="dropdown-item" to="customers/create/">Add a Potential Customer</NavLink>
                <NavLink className="dropdown-item" to="salesperson/create/">Add a Sales Person</NavLink>
              </div>
            </div>
          </li>
          <li>
            <div className="dropdown">
              <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Add
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <NavLink className="dropdown-item" to="/">Add a Technician</NavLink>
                <NavLink className="dropdown-item" to="salesperson/create/">Add a Sales Person</NavLink>
                <NavLink className="dropdown-item" to="customers/create">Add a Customer</NavLink>
              </div>
            </div>
          </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
