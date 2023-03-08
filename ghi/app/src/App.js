import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './components/sales/CustomerForm';
import SalesList from './components/sales/SalesList';
import SalesForm from './components/sales/SalesForm';
import SalesPersonList from './components/sales/SalesPersonList';
import SalesPersonForm from './components/sales/SalesPersonForm';
import ManufacturerList from './components/inventory/ManufacturerList';
import ManufacturerForm from './components/inventory/ManufacturerForm';
import VehicleList from './components/inventory/VehicleList';
import VehicleForm from './components/inventory/VehicleForm';
import AutomobileList from './components/inventory/AutomobileList';
import AutomobileForm from './components/inventory/AutomobileForm';
import AppointmentForm from './components/service/AppointmentForm';
import AppointmentList from './components/service/AppointmentList';
import AppointmentHistory from './components/service/AppointmentHistory';
import TechnicianForm from './components/service/TechnicianForm';


function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturerList/>}/>
            <Route path="create" element={<ManufacturerForm/>}/>
          </Route>
          <Route path="vehicles">
            <Route index element={<VehicleList/>}/>
            <Route path="create" element={<VehicleForm/>}/>
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobileList/>}/>
            <Route path="create" element={<AutomobileForm/>}/>
          </Route>
          <Route path="/customers/create" element={<CustomerForm/>}/>
          <Route path="/sales">
            <Route index element={<SalesList sales={props.sales}/>}/>
            <Route path="create" element={<SalesForm/>}/>
          </Route>
          <Route path="/salesperson">
            <Route index element={<SalesPersonList/>}/>
            <Route path="create" element={<SalesPersonForm/>}/>
          </Route>
          <Route path="/technician/create" element={<TechnicianForm/>}/>
          <Route path="service">
            <Route index element={<AppointmentList appointments={props.service}/>}/>
            <Route path="create" element={<AppointmentForm/>}/>
            <Route path="history" element={<AppointmentHistory appointments={props.service}/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
