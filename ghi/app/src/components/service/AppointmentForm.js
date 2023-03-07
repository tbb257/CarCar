import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function AppointmentForm() {
    const [technician, setTechnician] = useState([])
    const [bool, setBool] = useState(false)
    const [formData, setFormData] = useState({
        vin: "",
        customer_name: "",
        reason: "",
        date: "",
        time: "",
        technician: ""
    })

    const getData = async () => {
        const response = await fetch("http://localhost:8080/api/technicians/")

        if (response.ok) {
            const data = await response.json()
            setTechnician(data.technicians);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const handleFormChange = (e) => {
        const input = e.target.name;
        const value = e.target.value;

        setFormData({...formData, [input]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const appointmentURL = "http://localhost:8080/api/appointments/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(appointmentURL, fetchConfig);

        if (response.ok) {
            setFormData({
                vin: "",
                customer_name: "",
                reason: "",
                date: "",
                time: "",
                technician: ""
            })
            setBool(true)
        };
    };

    let submitted = bool
    let formClass
    let successClass

    if (!(submitted)) {
        formClass = " ";
        successClass = "d-none"
    } else {
        formClass = "d-none";
        successClass = "d-grid gap-2"
    }

    return (
    <div className="my-5 container">
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1 className="py-2">Make a New Appointment Here!</h1>
                <div className={successClass}>
                    <div className="alert alert-success mb-0" id="success-message">
                        Success! Appointment has been set.
                    </div>
                    <div className="my-2 container">
                        <Link className="btn btn-primary" to="/service/new">Add Another Appointment</Link>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className={formClass} id="create-appointment-form">
                <div className="form-floating mb-3">
                    <input value={formData.vin} onChange={handleFormChange} placeholder="vin" required type="number" name="vin" id="vin" className="form-control" />
                    <label htmlFor="vin">VIN (Vehicle Identification Number)</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={formData.customer_name} onChange={handleFormChange} placeholder="customer_name" required type="text" name="customer_name" id="customer_name" className="form-control" />
                    <label htmlFor="customer_name">Customer Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={formData.reason} onChange={handleFormChange} placeholder="reason" required type="text" name="reason" id="reason" className="form-control" />
                    <label htmlFor="reason">Reason for Appointment</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={formData.date} onChange={handleFormChange} placeholder="date" required type="date" name="date" id="date" className="form-control" />
                    <label htmlFor="date">Requested Date</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={formData.time} onChange={handleFormChange} placeholder="time" required type="time" name="time" id="time" className="form-control" />
                    <label htmlFor="time">Requested Time</label>
                </div>
                <div className="mb-3">
                    <select value={formData.technician} onChange={handleFormChange} required id="technician" name="technician" className="form-select">
                        <option value="">Choose Your Preferred Technician</option>
                        {technician.map(technician => {
                            return (
                            <option key={technician.href} value={technician.employee_num}>{technician.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" size="lg">Set Appointment</button>
                </div>
                </form>
            </div>
            </div>
        </div>
    </div>
    );

}

export default AppointmentForm;
