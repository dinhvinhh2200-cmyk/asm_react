import { useState } from "react";
import "./App.css";
import AddProduct from "./components/AddProduct";
import Order from "./components/Order";
import Customer from "./components/Customer";
import Nav from "./layout/Nav";
import { Button, Container, Alert } from "react-bootstrap";
import Dashboard from "./components/Dashboard";

function App() {
	const [page, setPage] = useState("dashboard");
	return (
		<>
			<div className="d-flex">
				{/* Truyền hàm và giá trị vào Nav */}
				<Nav setPage={setPage} currentPage={page} />

				<div
					className="flex-grow-1 p-4 bg-light"
					style={{ minHeight: "100vh" }}
				>
					{page === "dashboard" && <Dashboard />}
					{page === "products" && <AddProduct />}
					{page === "orders" && <Order />}
					{page === "customers" && <Customer />}
				</div>
			</div>
		</>
	);
}

export default App;
