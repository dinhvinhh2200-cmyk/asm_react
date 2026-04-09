import { NavLink } from "react-router-dom";
import "./nav.css"; // Đảm bảo bạn vẫn giữ file css cũ của mình

const Nav = () => {
	return (
		<div className="sidebar d-flex flex-column p-3 bg-dark text-white" style={{ width: "280px", minHeight: "100vh" }}>
			<div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
				<span className="fs-4">Admin Dashboard</span>
			</div>
			<hr />
			<ul className="nav nav-pills flex-column mb-auto">
				<li className="nav-item">
					<NavLink 
						to="/" 
						end 
						className={({ isActive }) => `nav-link ${isActive ? "active text-white" : "text-white"}`}
					>
						📊 Thống kê doanh thu
					</NavLink>
				</li>
				<li>
					<NavLink 
						to="/products" 
						className={({ isActive }) => `nav-link ${isActive ? "active text-white" : "text-white"}`}
					>
						📦 Quản lý sản phẩm
					</NavLink>
				</li>
				<li>
					<NavLink 
						to="/customers" 
						className={({ isActive }) => `nav-link ${isActive ? "active text-white" : "text-white"}`}
					>
						👥 Quản lý khách hàng
					</NavLink>
				</li>
				<li>
					<NavLink 
						to="/orders" 
						className={({ isActive }) => `nav-link ${isActive ? "active text-white" : "text-white"}`}
					>
						🛒 Quản lý đơn hàng
					</NavLink>
				</li>
			</ul>
			<hr />
			<div className="dropdown">
				{/* Phần hiển thị thông tin user theo Assignment Giai đoạn 2 */}
				<div className="d-flex align-items-center text-white text-decoration-none">
					<img src="https://via.placeholder.com/32" alt="avatar" width="32" height="32" className="rounded-circle me-2" />
					<strong>Xin chào, Vinh</strong>
				</div>
			</div>
		</div>
	);
};

export default Nav;