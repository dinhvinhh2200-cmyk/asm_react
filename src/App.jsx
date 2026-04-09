import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout"; // Đã sửa thành layout
import ProductList from "./pages/products/ProductList";
import ProductForm from "./pages/products/ProductForm";
import CustomerForm from "./pages/customers/CustomerForm";
import CustomerList from "./pages/customers/CustomerList";
import OrderList from "./pages/orders/OrderList";
import OrderDetail from "./pages/orders/OrderDetail";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        {/* Module Sản phẩm */}
        <Route path="products" element={<ProductList />} />
        <Route path="products/add" element={<ProductForm />} />
        <Route path="products/edit/:id" element={<ProductForm />} />
        {/*module khách hàng*/}
        <Route path="customers" element={<CustomerList />} />
        <Route path="customers/add" element={<CustomerForm />} />
        <Route path="customers/edit/:id" element={<CustomerForm />} />

        {/*module khách hàng*/}
        <Route path="orders" element={<OrderList />} />
        <Route path="orders/:id" element={<OrderDetail />} />

        <Route path="/" element={<Dashboard></Dashboard>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
