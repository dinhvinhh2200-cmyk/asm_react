import { NavLink, useNavigate } from "react-router-dom";
import "./nav.css";

const Nav = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="sidebar d-flex flex-column p-3 bg-dark text-white" style={{ width: "280px", minHeight: "100vh" }}>
      <div className="d-flex align-items-center mb-3 text-white text-decoration-none">
        <span className="fs-4 fw-bold">Trang quản trị</span>
      </div>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {user?.role === "Admin" && (
          <>
            <li className="nav-item">
              <NavLink to="/" end className="nav-link text-white">📊 Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/customers" className="nav-link text-white">👥 Quản lý khách hàng</NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/products" className="nav-link text-white">📦 Quản lý sản phẩm</NavLink>
        </li>
        <li>
          <NavLink to="/orders" className="nav-link text-white">🛒 Quản lý đơn hàng</NavLink>
        </li>
      </ul>
      <hr />
      
    </div>
  );
};
export default Nav;