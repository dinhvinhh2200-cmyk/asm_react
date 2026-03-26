
import './App.css'
import AddProduct from './components/AddProduct';
import Order from './components/Order';
import Customer from './components/Customer';
import { Button, Container, Alert } from "react-bootstrap"; 
import Dashboard from './components/Dashboard';


function App() {

  return (
    <>
      <AddProduct></AddProduct>
      <Order></Order>
      <Customer></Customer>
      <Dashboard></Dashboard>
    </>
  )
}

export default App
