import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const res = await axios.get("http://localhost:3000/orders");
    setOrders(res.data);
  };

  useEffect(() => { loadOrders(); }, []);

  // Hàm tính tổng tiền của đơn hàng
  const calculateTotal = (products) => {
    if (!products || products.length === 0) return 0;
    return products.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleUpdate = async (id, field, value, currentOrder) => {
    // Logic 1: Hoàn thành thì phải Đã thanh toán
    if (field === "status" && value === "Hoàn Thành" && currentOrder.paymentStatus === "Chưa thanh toán") {
      alert("Lỗi: Đơn hàng hoàn thành phải được thanh toán trước!");
      loadOrders();
      return;
    }
    
    // Logic 2: Nếu đã thanh toán thì không thể hủy đơn
    if (field === "status" && value === "Hủy đơn" && currentOrder.paymentStatus === "Đã thanh toán") {
      alert("Lỗi: Đơn hàng đã thanh toán không thể hủy!");
      loadOrders();
      return;
    }

    // Logic 3: Nếu đã hủy đơn thì không thể chuyển thành đã thanh toán
    if (field === "paymentStatus" && value === "Đã thanh toán" && currentOrder.status === "Hủy đơn") {
      alert("Lỗi: Đơn hàng đã hủy không thể thanh toán!");
      loadOrders();
      return;
    }
    
    try {
      await axios.patch(`http://localhost:3000/orders/${id}`, { [field]: value });
      loadOrders();
    } catch (error) {
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h4 className="fw-bold text-primary mb-3">Quản lý đơn hàng</h4>
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Khách hàng</th>
              <th>Ngày tạo</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Thanh toán</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="fw-bold">{o.id}</td>
                <td>{o.customerName}</td>
                <td>{o.createdDate}</td>
                <td className="text-success fw-bold">
                  {calculateTotal(o.products).toLocaleString('vi-VN')} đ
                </td>
                <td>
                  <select 
                    className="form-select form-select-sm" 
                    value={o.status}
                    onChange={(e) => handleUpdate(o.id, "status", e.target.value, o)}
                  >
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đã xử lý">Đã xử lý</option>
                    <option value="Đang vận chuyển">Đang vận chuyển</option>
                    <option value="Hoàn Thành">Hoàn Thành</option>
                    <option value="Hủy đơn">Hủy đơn</option>
                  </select>
                </td>
                <td>
                  <select 
                    className="form-select form-select-sm"
                    value={o.paymentStatus}
                    onChange={(e) => handleUpdate(o.id, "paymentStatus", e.target.value, o)}
                  >
                    <option value="Chưa thanh toán">Chưa thanh toán</option>
                    <option value="Đã thanh toán">Đã thanh toán</option>
                  </select>
                </td>
                <td>
                  <Link to={`/orders/${o.id}`} className="btn btn-sm btn-info text-white">
                    <i className="bi bi-eye"></i> Chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;