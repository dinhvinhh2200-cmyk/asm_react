import React from "react";
import Layout from "./Layout";

const Customer = () => {
	const customers = [
		{
			id: "CUS001",
			name: "Nguyễn Văn A",
			email: "vana@gmail.com",
			role: "User",
			status: "Hoạt động",
		},
		{
			id: "CUS002",
			name: "Trần Thị B",
			email: "thib@gmail.com",
			role: "User",
			status: "Bị khóa",
		},
		{
			id: "CUS003",
			name: "Lê Văn C",
			email: "admin_vanc@gmail.com",
			role: "Admin",
			status: "Hoạt động",
		},
		{
			id: "CUS004",
			name: "Phạm Thị D",
			email: "thid@gmail.com",
			role: "User",
			status: "Hoạt động",
		},
	];
	return (
		<Layout>
			<div className="container-fluid">
				{/* Tiêu đề trang */}
				<div className="d-flex justify-content-between align-items-center mb-4 p-2 bg-white rounded shadow-sm">
					<h3 className="fw-bold text-primary m-0">Quản lý khách hàng</h3>
				</div>

				{/* Bảng danh sách */}
				<div className="card shadow-sm">
					<div className="card-body p-0">
						<table className="table table-hover table-bordered mb-0 align-middle">
							<thead className="table-dark">
								<tr>
									<th className="text-center">ID</th>
									<th>Tên khách hàng</th>
									<th>Email</th>
									<th className="text-center">Vai trò</th>
									<th className="text-center">Trạng thái</th>
									<th className="text-center">Hành động</th>
								</tr>
							</thead>
							<tbody>
								{customers.map((cus) => (
									<tr key={cus.id}>
										<td className="text-center fw-bold">{cus.id}</td>
										<td>{cus.name}</td>
										<td>{cus.email}</td>
										<td className="text-center">
											<span
												className={`badge ${cus.role === "Admin" ? "bg-danger" : "bg-info text-dark"}`}
											>
												{cus.role}
											</span>
										</td>
										<td className="text-center">
											<span
												className={`badge ${cus.status === "Bị khóa" ? "bg-secondary" : "bg-success"}`}
											>
												{cus.status}
											</span>
										</td>
										<td className="text-center">
											{/* Logic hiển thị nút bấm dựa trên Role và Status */}
											{cus.role === "User" ? (
												cus.status === "Bị khóa" ? (
													<button
														className="btn btn-sm btn-success"
														style={{ width: "100px" }}
													>
														Mở khóa
													</button>
												) : (
													<button
														className="btn btn-sm btn-outline-danger"
														style={{ width: "100px" }}
													>
														Khóa
													</button>
												)
											) : (
												<span className="text-muted small">---</span>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Customer;
