import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; // QUAN TRỌNG: Phải có useNavigate
import Nav from './Nav';

const AdminLayout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // QUAN TRỌNG: Khởi tạo navigate

  useEffect(() => {
    // Lấy thông tin user từ localStorage khi trang load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Lỗi parse user:", error);
      }
    }
  }, []);

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user"); // Xóa dữ liệu session
    navigate("/login"); // Chuyển hướng người dùng
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar (Nav) */}
      <div className="bg-dark text-white" style={{ width: "250px" }}>
        <Nav />
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column bg-light">
        {/* Header */}
        <header className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
          <h4 className="m-0 text-primary fw-bold">Trang Quản Trị</h4>
          
          <div className="d-flex align-items-center border-start ps-3">
            <div className="d-flex align-items-center me-3">
              <img 
                src={user?.avatar || "https://via.placeholder.com/32"} 
                alt="avatar" 
                width="32" 
                height="32" 
                className="rounded-circle me-2" 
              />
              <div className="small">
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>Xin chào,</div>
                <strong className="d-block text-truncate" style={{ maxWidth: "150px" }}>
                  {user?.username || "Admin"}
                </strong>
              </div>
            </div>
            {/* Nút đăng xuất gọi hàm handleLogout đã định nghĩa ở trên */}
            <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
              Đăng xuất
            </button>
          </div>
        </header>

        {/* Nội dung các trang con */}
        <main className="p-4 flex-grow-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;