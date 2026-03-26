import React from 'react';
import './nav.css'

const Nav = () => {
    return (
        <div className="sidebar d-flex flex-column flex-shrink-0 p-3 text-white">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4 fw-bold">ADMIN PANEL</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="#" className="nav-link active" aria-current="page">
                        1. Quản lý sản phẩm
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link">
                        2. Quản lý đơn hàng
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link">
                        3. Quản lý khách hàng
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link">
                        4. Thống kê doanh thu
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Nav;