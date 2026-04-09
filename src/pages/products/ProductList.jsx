import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const loadData = () => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => { loadData(); }, []);

  const deleteProduct = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) { [cite: 12]
      await fetch(`http://localhost:3000/products/${id}`, { method: "DELETE" });
      loadData();
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
              <th>ID</th> <th>Hình</th> <th>Tên</th> <th>Giá</th> <th>Danh mục</th> <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td><img src={p.image} width="50" height="50" style={{objectFit:'cover'}} className="rounded" alt="" /></td> [cite: 2]
                <td>{p.name}</td>
                <td>{p.price}.000đ</td>
                <td><span className="badge bg-info">{p.category}</span></td>
                <td>
                  <Link to={`/products/edit/${p.id}`} className="btn btn-sm btn-warning me-2">Sửa</Link>
                  <button onClick={() => deleteProduct(p.id)} className="btn btn-sm btn-danger">Xóa</button> [cite: 4]
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProductList;