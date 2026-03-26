import React from "react";
import "./nav.css";

const Nav = (props) => {
	return (
		<div className="sidebar d-flex flex-column flex-shrink-0 p-3 text-white">
			<a
				href="#"
				onClick={() => props.setPage("dashboard")}
				className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
			>
				<span className="fs-4 fw-bold">ADMIN PANEL</span>
			</a>
			<hr />
			<ul className="nav nav-pills flex-column mb-auto">
				<li className="nav-item">
					<a
						href="#"
						className={`nav-link ${props.currentPage === "products" ? "active" : ""}`}
						onClick={(e) => {
							e.preventDefault();
							props.setPage("products");
						}}
					>
						1. Quản lý sản phẩm
					</a>
				</li>
				<li>
					<a
						href="#"
						className={`nav-link ${props.currentPage === "orders" ? "active" : ""}`}
						onClick={(e) => {
							e.preventDefault();
							props.setPage("orders");
						}}
					>
						2. Quản lý đơn hàng
					</a>
				</li>
				<li>
					<a
						href="#"
						className={`nav-link ${props.currentPage === "customers" ? "active" : ""}`}
						onClick={(e) => {
							e.preventDefault();
							props.setPage("customers");
						}}
					>
						3. Quản lý khách hàng
					</a>
				</li>
				<li>
					<a
						href="#"
						className={`nav-link ${props.currentPage === "dashboard" ? "active" : ""}`}
						onClick={(e) => {
							e.preventDefault();
							props.setPage("dashboard");
						}}
					>
						4. Thống kê doanh thu
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Nav;
