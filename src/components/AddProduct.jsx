import React from "react";
import Layout from "./Layout";

const AddProduct = () => {
	const products = [
		{
			id: 1,
			name: "T-Shirt",
			image: "https://i.pinimg.com/1200x/77/33/79/773379858d28da59d36813fca43cc980.jpg", 
			price: 100,
			category: "Quần áo",
		},
		{
			id: 2,
			name: "Balance",
			image: "https://i.pinimg.com/1200x/40/8c/1d/408c1d9cabb050f24cb27303efdc63e9.jpg", 
			price: 200,
			category: "Giày dép",
		},
		{
			id: 3,
			name: "Mắt kính",
			image: "https://i.pinimg.com/1200x/1e/a3/54/1ea35499763efad8e5ef9a80c43a0375.jpg", 
			price: 150,
			category: "Phụ kiện",
		},
	];
	return (
		<Layout>
			<div className="container-fluid">
				{/* Tiêu đề và nút thêm mới */}
				<div className="d-flex justify-content-between align-items-center mb-4 p-2 bg-white rounded shadow-sm">
					<h3 className="fw-bold text-primary m-0">Quản lý sản phẩm</h3>
					<button className="btn btn-primary d-flex align-items-center">
						<i className="bi bi-plus-circle me-2"></i> Thêm sản phẩm mới
					</button>
				</div>

				{/* Bảng danh sách sản phẩm */}
				<div className="card shadow-sm">
					<div className="card-body p-0">
						<table className="table table-hover table-striped table-bordered mb-0 align-middle">
							<thead className="table-dark">
								<tr>
									<th className="text-center" style={{ width: "50px" }}>
										STT
									</th>
									<th className="text-center" style={{ width: "80px" }}>
										Hình
									</th>
									<th>Tên sản phẩm</th>
									<th>Giá tiền</th>
									<th>Danh mục</th>
									<th className="text-center" style={{ width: "150px" }}>
										Hành động
									</th>
								</tr>
							</thead>
							<tbody>
								{products.map((item, index) => (
									<tr key={item.id}>
										<td className="text-center fw-bold">{index + 1}</td>
										<td className="text-center">
											{/* Hiển thị hình ảnh sản phẩm */}
											<img
												src={item.image}
												alt={item.name}
												className="img-thumbnail" // Thêm khung viền ảnh
												style={{
													width: "60px",
													height: "60px",
													objectFit: "cover", // Giúp ảnh không bị méo
												}}
											/>
										</td>
										<td className="fw-medium text-secondary">{item.name}</td>
										<td>
											<span className="badge bg-success fs-6">
												{item.price}.000đ
											</span>
										</td>
										<td>{item.category}</td>
										<td className="text-center">
											<button
												className="btn btn-sm btn-outline-warning me-2"
												title="Sửa"
											>
												Sửa
											</button>
											<button
												className="btn btn-sm btn-outline-danger"
												title="Xóa"
											>
												Xóa
											</button>
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

export default AddProduct;
