import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout"; // Đã sửa thành layout
import Dashboard from "./components/Dashboard"; // Đã sửa đường dẫn
import ProductList from "./pages/products/ProductList";
import ProductForm from "./pages/products/ProductForm";
import CustomerList from "./components/Customer"; // Đã sửa đường dẫn
import OrderList from "./components/Order"; // Đã sửa đường dẫn

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        {/* Module Sản phẩm */}
        <Route path="products" element={<ProductList />} />
        <Route path="products/add" element={<ProductForm />} />
        <Route path="products/edit/:id" element={<ProductForm />} />
        {/* Module Khách hàng */}
        <Route path="customers" element={<CustomerList />} />
        {/* Module Đơn hàng */}
        <Route path="orders" element={<OrderList />} />
      </Route>
    </Routes>
  );
}

export default App;