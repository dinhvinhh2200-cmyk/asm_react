import { Routes, Route, Navigate } from "react-router-dom"; // Thêm Navigate
import AdminLayout from "./layout/AdminLayout";
import ProductList from "./pages/products/ProductList";
import ProductForm from "./pages/products/ProductForm";
import CustomerForm from "./pages/customers/CustomerForm";
import CustomerList from "./pages/customers/CustomerList";
import OrderList from "./pages/orders/OrderList";
import OrderDetail from "./pages/orders/OrderDetail";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";

// Đưa ProtectedRoute ra ngoài function App
const ProtectedRoute = ({ children, roles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <Routes>
      {/* Route công khai */}
      <Route path="/login" element={<Login />} />

      {/* Route yêu cầu đăng nhập */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Trang chủ - Thống kê (Chỉ Admin) */}
        <Route index element={
          <ProtectedRoute roles={["Admin"]}>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* Module Sản phẩm (Admin & Employee) */}
        <Route path="products" element={<ProductList />} />
        <Route path="products/add" element={<ProductForm />} />
        <Route path="products/edit/:id" element={<ProductForm />} />

        {/* Module Khách hàng (Chỉ Admin) */}
        <Route path="customers" element={
          <ProtectedRoute roles={["Admin"]}>
            <CustomerList />
          </ProtectedRoute>
        } />
        <Route path="customers/add" element={
          <ProtectedRoute roles={["Admin"]}>
            <CustomerForm />
          </ProtectedRoute>
        } />
        <Route path="customers/edit/:id" element={
          <ProtectedRoute roles={["Admin"]}>
            <CustomerForm />
          </ProtectedRoute>
        } />

        {/* Module Đơn hàng (Admin & Employee) */}
        <Route path="orders" element={<OrderList />} />
        <Route path="orders/:id" element={<OrderDetail />} />
      </Route>

      {/* Redirect nếu sai đường dẫn */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;