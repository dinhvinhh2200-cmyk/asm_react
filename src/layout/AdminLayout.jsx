import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; // Cần thêm useLocation
import Nav from './Nav';

const AdminLayout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 1. Lấy thông tin user
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const currentUser = JSON.parse(storedUser);
    setUser(currentUser);

    // 2. Xử lý trang trắng: Nếu đang ở "/admin" thì chuyển hướng dựa trên role
    if (location.pathname === "/admin" || location.pathname === "/admin/") {
      if (currentUser.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/admin/products"); // User thường (employee) vào thẳng trang Sản phẩm
      }
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div className="bg-dark text-white" style={{ width: "250px" }}>
        <Nav />
      </div>
      <div className="flex-grow-1 d-flex flex-column bg-light">
        <header className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
          <h4 className="m-0 text-primary fw-bold">Trang Quản Trị</h4>
          <div className="d-flex align-items-center border-start ps-3">
            <div className="d-flex align-items-center me-3">
              <img src={user?.avatar || "https://via.placeholder.com/32"} alt="avatar" width="32" height="32" className="rounded-circle me-2" />
              <div className="small">
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>Xin chào,</div>
                <strong className="d-block text-truncate" style={{maxWidth: "150px"}}>{user?.username}</strong>
              </div>
            </div>
            <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">Đăng xuất</button>
          </div>
        </header>
        <main className="p-4 flex-grow-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;