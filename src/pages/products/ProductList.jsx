import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  // State cho tìm kiếm và lọc
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số lượng sản phẩm trên mỗi trang

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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

  // 1. XỬ LÝ LỌC VÀ TÌM KIẾM
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // 2. XỬ LÝ PHÂN TRANG
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Lấy danh sách danh mục duy nhất để hiển thị trong bộ lọc
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <h4 className="fw-bold mb-0">Danh sách sản phẩm</h4>
          <Link to="/products/add" className="btn btn-success">+ Thêm mới</Link>
        </div>

        {/* BỘ LỌC VÀ TÌM KIẾM */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo tên sản phẩm..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
              }}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                setCurrentPage(1); // Reset về trang 1 khi lọc
              }}
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
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
            {currentItems.length > 0 ? (
              currentItems.map((p, index) => {
                const isDisabled = p.status === "Không hoạt động";
                return (
                  <tr key={p.id} style={{ opacity: isDisabled ? 0.5 : 1, transition: '0.3s' }}>
                    <td className="text-center fw-bold">{indexOfFirstItem + index + 1}</td>
                    <td>
                      <img src={p.image} width="50" height="50" style={{ objectFit: 'cover' }} className="rounded" alt="" />
                    </td>
                    <td>{p.name}</td>
                    <td>{Number(p.price).toLocaleString('vi-VN')}đ</td>
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
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">Không tìm thấy sản phẩm nào</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ĐIỀU KHIỂN PHÂN TRANG */}
        {totalPages > 1 && (
          <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Trước</button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Sau</button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default ProductList;