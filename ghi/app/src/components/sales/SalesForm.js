import React, { useEffect, useState } from 'react';


function SalesForm() {
//_______________________________________________________________________________________________________________________________________________________________________//
    //Create UseStates for Dropdown items
    const [automobileList, autoList] = useState(['']);
    const [sPersonList, salesPersonList] = useState(['']);
    const [customersList, customerList] = useState(['']);

    //Fetch data for dropdown lists
    const fetchData = async () => {
        const autoURL = 'http://localhost:8100/api/automobiles/'
        const salesPersonURL = 'http://localhost:8090/api/salesperson/'
        const customerURL = 'http://localhost:8090/api/customers/'

        const autoResponse = await fetch(autoURL);
        const salesResponse = await fetch(salesPersonURL);
        const customerResponse = await fetch(customerURL);
        if (autoResponse.ok && salesResponse.ok && customerResponse.ok){
            const autoData = await autoResponse.json();
            const salesData = await salesResponse.json();
            const customerData = await customerResponse.json();

            console.log(autoData)
            console.log(salesData)
            console.log(customerData)

            autoList(autoData.autos)
            salesPersonList(salesData.salesperson)
            customerList(customerData.customers)
        }

    }
    useEffect(()=>{
        fetchData();
    }, []);

//_____________________________________________________________________________________________________________________________________________________________________//

    // CONVERT FRONT-END INPUT INTO USABLE ELEMENT //
    const [auto, setAuto] = useState('');
    const [salesperson, setPerson] = useState('');
    const [customer, setCustomer] = useState('');
    const [price, setPrice] = useState('');

    const handleAutoChange = (event) => {
        const value = event.target.value;
        setAuto(value);
    }
    const handlePersonChange = (event) => {
        const value = event.target.value;
        setPerson(value);
    }
    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }
    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    // Create submit feature //
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.automobile = auto
        data.salesperson = salesperson
        data.customer = customer
        data.price = price

        const salesRecordURL = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(salesRecordURL, fetchConfig);
        if (response.ok){
            const newSale = await response.json();
            console.log(newSale)

            setAuto('');
            setPerson('');
            setCustomer('');
            setPrice('');
        }
    }

//____________________________________________________________________________________________________________________________________________//

    return(
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Sales person history</h1>
                    <form onSubmit={handleSubmit} id="create-sale">
                        <div className="mb-3">
                            <select onChange={handleAutoChange} value={auto} required id="automobile" name="automobile" className="form-select">
                                <option>Choose an Automobile</option>
                                {automobileList.map(auto =>{
                                    return (
                                        <option key={auto.href} value={auto.href}>
                                            {auto.vin}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={handlePersonChange} value={salesperson} required id="salesperson" name="salesperson" className="form-select">
                                <option>Choose a Salesperson</option>
                                {sPersonList.map(person =>{
                                    return (
                                        <option key={person.employee_number} value={person.employee_number}>
                                            {person.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleCustomerChange} value={customer} required id="customer" name="customer" className="form-select">
                                <option>Choose a Customer</option>
                                {customersList.map(customer =>{
                                    return (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePriceChange} value={price} placeholder="price" required type="number" name="price" id="price" className="form-control"/>
                            <label htmlFor="price">Sale Price</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SalesForm
