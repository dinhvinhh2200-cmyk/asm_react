
import './App.css'
import AddProduct from './components/AddProduct';
import Order from './components/Order';
import Customer from './components/Customer';
import { Button, Container, Alert } from "react-bootstrap"; 


function App() {

  return (
    <>
      <AddProduct></AddProduct>
      <Order></Order>
      <Customer></Customer>
    </>
  )
}

export default App
