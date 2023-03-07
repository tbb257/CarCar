import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './components/sales/CustomerForm';
import SalesList from './components/sales/SalesList';
import SalesForm from './components/sales/SalesForm';
import SalesPersonDetail from './components/sales/SalesPersonDetail';
import SalesPersonForm from './components/sales/SalesPersonForm';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/customers/create" element={<CustomerForm/>}/>
          <Route path="/sales">
            <Route index element={<SalesList sales={props.sales}/>}/>
            <Route path="create" element={<SalesForm/>}/>
          </Route>
          <Route path="/salesperson">
            <Route index element={<SalesPersonDetail/>}/>
            <Route path="create" element={<SalesPersonForm/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
