import React from "react";
import Layout from "./Layout";

const Order = () => {
	const orders = [
		{
			id: "ORD001",
			customerId: "CUS101",
			productId: "PROD01",
			productName: "T-Shirt",
			quantity: 2,
			totalPrice: 200,
		},
		{
			id: "ORD002",
			customerId: "CUS102",
			productId: "PROD02",
			productName: "Balance",
			quantity: 1,
			totalPrice: 200,
		},
		{
			id: "ORD003",
			customerId: "CUS103",
			productId: "PROD03",
			productName: "Mắt kính",
			quantity: 3,
			totalPrice: 450,
		},
	];
	return (
		<Layout>
			<div className="container-fluid">
				{/* Tiêu đề trang quản lý đơn hàng */}
				<div className="d-flex justify-content-between align-items-center mb-4 p-2 bg-white rounded shadow-sm">
					<h3 className="fw-bold text-primary m-0">Quản lý đơn hàng</h3>
				</div>

				{/* Bảng danh sách đơn hàng */}
				<div className="card shadow-sm">
					<div className="card-body p-0">
						<table className="table table-hover table-striped table-bordered mb-0 align-middle">
							<thead className="table-dark">
								<tr>
									<th className="text-center">ID Đơn hàng</th>
									<th className="text-center">ID Khách hàng</th>
									<th className="text-center">ID Sản phẩm</th>
									<th>Tên sản phẩm</th>
									<th className="text-center">Số lượng</th>
									<th>Tổng tiền</th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr key={order.id}>
										<td className="text-center fw-bold text-primary">
											{order.id}
										</td>
										<td className="text-center">{order.customerId}</td>
										<td className="text-center">{order.productId}</td>
										<td className="fw-medium text-secondary">
											{order.productName}
										</td>
										<td className="text-center">
											<span className="badge bg-info text-dark">
												{order.quantity}
											</span>
										</td>
										<td>
											<span className="badge bg-success fs-6">
												{order.totalPrice}.000đ
											</span>
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

export default Order;
