import React from "react";
import Layout from "./Layout";

const Dashboard = () => {
	// Dữ liệu mẫu cho 3 thẻ thống kê chính
	const stats = [
		{
			id: 1,
			title: "Tổng doanh thu",
			value: "500.000.000đ",
			icon: "bi-currency-dollar",
			color: "primary",
		},
		{
			id: 2,
			title: "Đơn hàng mới",
			value: "120",
			icon: "bi-cart-check",
			color: "success",
		},
		{
			id: 3,
			title: "Khách hàng",
			value: "850",
			icon: "bi-people",
			color: "warning",
		},
	];

	// Dữ liệu biểu đồ cột mô phỏng doanh thu 6 tháng
	const chartData = [
		{ month: "T1", value: 40 },
		{ month: "T2", value: 70 },
		{ month: "T3", value: 50 },
		{ month: "T4", value: 90 },
		{ month: "T5", value: 60 },
		{ month: "T6", value: 80 },
	];

	// Dữ liệu bảng bán quần áo
	const salesData = [
		{
			id: "#8801",
			product: "Áo sơ mi lụa",
			category: "Quần áo",
			amount: "350.000đ",
			quantity: 10,
		},
		{
			id: "#8802",
			product: "Quần Jean Nam",
			category: "Quần áo",
			amount: "550.000đ",
			quantity: 5,
		},
		{
			id: "#8803",
			product: "Áo thun Basic",
			category: "Quần áo",
			amount: "150.000đ",
			quantity: 25,
		},
		{
			id: "#8804",
			product: "Váy hoa nhí",
			category: "Quần áo",
			amount: "450.000đ",
			quantity: 8,
		},
	];

	return (
		<Layout>
			<div className="container-fluid">
				<div className="mb-4">
					<h3 className="fw-bold text-primary">Báo cáo hệ thống</h3>
				</div>

				{/* Hàng 3 thẻ thống kê (đã bỏ sản phẩm sắp hết) */}
				<div className="row g-3 mb-4">
					{stats.map((item) => (
						<div className="col-md-4" key={item.id}>
							<div
								className={`card border-0 shadow-sm border-start border-4 border-${item.color}`}
							>
								<div className="card-body">
									<h6 className="text-muted small text-uppercase">
										{item.title}
									</h6>
									<h4 className="fw-bold mb-0">{item.value}</h4>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="row">
					{/* Phần Biểu đồ cột */}
					<div className="col-md-7 mb-4">
						<div className="card shadow-sm border-0 h-100">
							<div className="card-header bg-white py-3">
								<h5 className="mb-0 fw-bold">Biểu đồ doanh thu (Triệu VNĐ)</h5>
							</div>
							<div
								className="card-body d-flex align-items-end justify-content-between pt-5"
								style={{ height: "300px" }}
							>
								{chartData.map((data, index) => (
									<div
										key={index}
										className="text-center"
										style={{ width: "12%" }}
									>
										<div
											className="bg-primary rounded-top mx-auto"
											style={{
												height: `${data.value * 2}px`,
												width: "100%",
												transition: "height 0.5s ease",
											}}
										></div>
										<div className="mt-2 small fw-bold">{data.month}</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Phần Bảng bán hàng (Quần áo) */}
					<div className="col-md-5 mb-4">
						<div className="card shadow-sm border-0 h-100">
							<div className="card-header bg-white py-3">
								<h5 className="mb-0 fw-bold">Bán quần áo gần đây</h5>
							</div>
							<div className="card-body p-0">
								<table className="table table-hover align-middle mb-0">
									<thead className="bg-light">
										<tr>
											<th className="ps-3">Sản phẩm</th>
											<th>Danh mục</th>
											<th className="text-end pe-3">Giá</th>
										</tr>
									</thead>
									<tbody>
										{salesData.map((item) => (
											<tr key={item.id}>
												<td className="ps-3">
													<div className="fw-bold">{item.product}</div>
													<small className="text-muted">
														SL: {item.quantity}
													</small>
												</td>
												<td>
													<span className="badge bg-info-subtle text-info border border-info">
														{item.category}
													</span>
												</td>
												<td className="text-end pe-3 fw-bold text-success">
													{item.amount}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
