import React, {useState} from 'react';

function TechnicianForm() {
    const [bool, setBool] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        employee_num: ""
    })

    const handleFormChange = (e) => {
        const input = e.target.name;
        const value = e.target.value;

        setFormData({...formData, [input]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const technicianURL = "http://localhost:8080/api/technicians/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(technicianURL, fetchConfig);

        if (response.ok) {
            setFormData({
                name: "",
                employee_num: ""
            })
            setBool(true)
        };
    };

    const handleNewForm = (e) => {
        setBool(false)
    }

    let submitted = bool
    let formClass
    let successClass
    let titleClass

    if (!(submitted)) {
        formClass = " ";
        successClass = "d-none"
        titleClass = "py-2"
    } else {
        formClass = "d-none";
        successClass = "d-grid gap-2"
        titleClass = "py-2 d-none"
    }

    return (
    <div className="my-5 container">
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1 className={titleClass} style={{textAlign:'center'}}>Register A New Technician!</h1>
                <div className={successClass}>
                    <div className="alert alert-success mb-0" id="success-message">
                        <h2 style={{textAlign:'center'}}>Success!</h2>
                        <h5 style={{textAlign:'center'}}>Technician has been registered.</h5>
                    </div>
                    <div className="d-grid gap-2" style={{padding:'2px'}}>
                        <button onClick={handleNewForm} className="btn btn-primary">Register Another Technician</button>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className={formClass} id="create-technician-form">
                <div className="form-floating mb-3">
                    <input value={formData.name} onChange={handleFormChange} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="name">Technician Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={formData.employee_num} onChange={handleFormChange} placeholder="employee_num" required type="number" name="employee_num" id="employee_num" className="form-control" />
                    <label htmlFor="employee_num">Employee Number</label>
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" size="lg">Add Technician</button>
                </div>
                </form>
            </div>
            </div>
        </div>
    </div>
    );

}

export default TechnicianForm;
