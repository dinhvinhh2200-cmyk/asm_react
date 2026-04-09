import {  Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/products/ProductList";
import ProductForm from "./pages/products/ProductForm";
import CustomerList from "./pages/customers/CustomerList";
import OrderList from "./pages/orders/OrderList";

function App() {
	return (
		
			<Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          {/* Module Sản phẩm [cite: 1] */}
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
          {/* Module Khách hàng [cite: 14] */}
          <Route path="customers" element={<CustomerList />} />
          {/* Module Đơn hàng [cite: 27] */}
          <Route path="orders" element={<OrderList />} />
        </Route>
      </Routes>
		
	);
}

export default App;