import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function AutomobileForm() {
    const [models, setModels] = useState([])
    const [bool, setBool] = useState(false)
    const [formData, setFormData] = useState({
        color: "",
        year: "",
        vin: "",
        model_id: ""
    })

    const getData = async () => {
        const response = await fetch("http://localhost:8100/api/models/")

        if (response.ok) {
            const data = await response.json()
            setModels(data.models);
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

        const autoURL = "http://localhost:8100/api/automobiles/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(autoURL, fetchConfig);

        if (response.ok) {
            setFormData({
                color: "",
                year: "",
                vin: "",
                model_id: ""
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

    let navigate = useNavigate()
    const routeChange = () => {
        navigate("/automobiles")
        window.location.reload(true)
    }

    return (
    <div className="my-5 container">
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1 className={titleClass} style={{textAlign:'center'}}>Add A New Automobile</h1>
                <div className={successClass}>
                    <div className="alert alert-success mb-0" id="success-message">
                        <h2 style={{textAlign:'center'}}>Success!</h2>
                        <h5 style={{textAlign:'center'}}>Automobile has been added.</h5>
                    </div>
                    <div className="my-2 container btn-group gap-2" style={{padding:'2px'}}>
                        <button onClick={handleNewForm} className="btn btn-primary">Add Another Automobile</button>
                        <button onClick={routeChange} className="btn btn-info" style={{color: 'white'}}>All Automobiles</button>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className={formClass} id="create-automobile-form">
                <div className="form-floating mb-3">
                    <input value={formData.color} onChange={handleFormChange} placeholder="color" required type="text" name="color" id="color" className="form-control" />
                    <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={formData.year} onChange={handleFormChange} placeholder="year" required type="number" name="year" id="year" className="form-control" />
                    <label htmlFor="year">Year</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={formData.vin} onChange={handleFormChange} placeholder="vin" required type="text" name="vin" id="vin" className="form-control" />
                    <label htmlFor="vin">VIN (Vehicle Identification Number)</label>
                </div>
                <div className="mb-3">
                    <select value={formData.model_id} onChange={handleFormChange} required id="model_id" name="model_id" className="form-select">
                        <option value="">Choose A Model</option>
                        {models.map(model => {
                            return (
                            <option key={model.href} value={model.id}>{model.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" size="lg">Add Automobile</button>
                </div>
                </form>
            </div>
            </div>
        </div>
    </div>
    );

}

export default AutomobileForm;
