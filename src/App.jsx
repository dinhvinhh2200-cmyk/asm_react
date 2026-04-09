import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import ProductList from "./pages/products/ProductList";
import ProductForm from "./pages/products/ProductForm";
import CustomerForm from "./pages/customers/CustomerForm";
import CustomerList from "./pages/customers/CustomerList";
import OrderList from "./pages/orders/OrderList";
import OrderDetail from "./pages/orders/OrderDetail";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";

/* ========= PROTECTED ROUTE ========= */
const ProtectedRoute = ({ children, roles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" replace />;

  const role = user.role?.toLowerCase();

  if (roles && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

/* ========= REDIRECT THEO ROLE ========= */
const RoleRedirect = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" replace />;

  const role = user.role?.toLowerCase();

  if (role === "admin") return <Navigate to="/dashboard" replace />;

  return <Navigate to="/products" replace />;
};

/* ========= APP ========= */
function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />

      {/* PRIVATE */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* redirect khi vào "/" */}
        <Route index element={<RoleRedirect />} />

        {/* DASHBOARD - ADMIN */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* PRODUCTS - ALL */}
        <Route path="products" element={<ProductList />} />
        <Route path="products/add" element={<ProductForm />} />
        <Route path="products/edit/:id" element={<ProductForm />} />

        {/* CUSTOMERS - ADMIN */}
        <Route
          path="customers"
          element={
            <ProtectedRoute roles={["admin"]}>
              <CustomerList />
            </ProtectedRoute>
          }
        />
        <Route
          path="customers/add"
          element={
            <ProtectedRoute roles={["admin"]}>
              <CustomerForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="customers/edit/:id"
          element={
            <ProtectedRoute roles={["admin"]}>
              <CustomerForm />
            </ProtectedRoute>
          }
        />

        {/* ORDERS - ALL */}
        <Route path="orders" element={<OrderList />} />
        <Route path="orders/:id" element={<OrderDetail />} />
      </Route>

      {/* NOT FOUND */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;