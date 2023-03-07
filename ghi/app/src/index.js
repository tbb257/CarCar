import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


async function loadSalesAndService(){
  const responseSales = await fetch("http://localhost:8090/api/sales/");
  const responseService = await fetch("http://localhost:8080/api/appointments/");

  if (responseSales.ok && responseService.ok){
    const dataSales = await responseSales.json();
    const dataService = await responseService.json();


    root.render(
      <React.StrictMode>
        <App sales = {dataSales.sales} service = {dataService.appointments}/>
      </React.StrictMode>
    )
  }else{
    console.error("Bad fetch");
  }
}

loadSalesAndService();
