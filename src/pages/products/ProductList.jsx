import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const loadData = async () => {
    try {
      // Axios tự động chuyển response thành JSON qua thuộc tính .data
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  useEffect(() => { loadData(); }, []);

  const deleteProduct = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) { 
      try {
        await axios.delete(`http://localhost:3000/products/${id}`);
        loadData();
      } catch (error) {
        alert("Xóa thất bại!");
      }
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <h4 className="fw-bold">Danh sách sản phẩm</h4>
          <Link to="/products/add" className="btn btn-success">+ Thêm mới</Link>
        </div>
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th className="text-center">STT</th> 
              <th>Hình</th> 
              <th>Tên</th> 
              <th>Giá</th> 
              <th>Danh mục</th> 
              <th className="text-center">Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => {
              const isDisabled = p.status === "Không hoạt động";
              return (
                <tr key={p.id} style={{ opacity: isDisabled ? 0.5 : 1, transition: '0.3s' }}>
                  <td className="text-center fw-bold">{index + 1}</td> 
                  <td>
                    <img src={p.image} width="50" height="50" style={{objectFit:'cover'}} className="rounded" alt="" />
                  </td> 
                  <td>{p.name}</td>
                  <td>{Number(p.price).toLocaleString()}.000đ</td>
                  <td><span className="badge bg-info text-dark">{p.category}</span></td>
                  <td className="text-center">
                    <span className={`badge ${isDisabled ? 'bg-secondary' : 'bg-success'}`}>
                      {p.status || "Hoạt động"}
                    </span>
                  </td>
                  <td>
                    <Link to={`/products/edit/${p.id}`} className="btn btn-sm btn-warning me-2">Sửa</Link>
                    <button onClick={() => deleteProduct(p.id)} className="btn btn-sm btn-danger">Xóa</button> 
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProductList;