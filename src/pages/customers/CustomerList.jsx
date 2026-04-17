import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  const loadCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/customers");
      setCustomers(res.data);
    } catch (error) {
      console.error("Lỗi tải khách hàng:", error);
    }
  };

  useEffect(() => { loadCustomers(); }, []);

  const deleteCustomer = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      try {
        await axios.delete(`http://localhost:3000/customers/${id}`);
        loadCustomers();
        alert("Xóa thành công!");
      } catch (error) {
        alert("Xóa thất bại!");
      }
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <h4 className="fw-bold text-primary">Danh sách khách hàng</h4>
          <Link to="/customers/add" className="btn btn-success">+ Thêm khách hàng</Link>
        </div>
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>STT</th>
              <th>Họ tên</th>
              <th>Ngày sinh</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Giới tính</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, index) => (
              <tr key={c.id}>
                <td>{index + 1}</td>
                <td className="fw-bold text-dark">{c.name}</td>
                <td>{c.birthday}</td>
                <td>{c.phone}</td>
                <td>{c.address}</td>
                <td>{c.gender}</td>
                <td>
                  <Link to={`/customers/edit/${c.id}`} className="btn btn-sm btn-warning me-2">Sửa</Link>
                  <button onClick={() => deleteCustomer(c.id)} className="btn btn-sm btn-danger">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;