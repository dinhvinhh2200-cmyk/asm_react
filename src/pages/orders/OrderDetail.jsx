import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/orders/${id}`).then(res => setOrder(res.data));
  }, [id]);

  if (!order) return <div>Đang tải...</div>;

  const totalAmount = order.products.reduce((sum, p) => sum + (p.price * p.quantity), 0);

  return (
    <div className="card shadow-sm border-0 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">Chi tiết đơn hàng #{order.id}</h3>
        <button className="btn btn-secondary" onClick={() => navigate("/orders")}>Quay lại</button>
      </div>
      
      <div className="row mb-4">
        <div className="col-md-6">
          <p><strong>Khách hàng:</strong> {order.customerName}</p>
          <p><strong>Ngày đặt:</strong> {order.createdDate}</p>
        </div>
        <div className="col-md-6 text-md-end">
          <p><strong>Trạng thái:</strong> <span className="badge bg-primary">{order.status}</span></p>
          <p><strong>Thanh toán:</strong> <span className="badge bg-info text-dark">{order.paymentStatus}</span></p>
        </div>
      </div>

      <h5 className="fw-bold mb-3">Sản phẩm đã mua</h5>
      <table className="table table-bordered">
        <thead className="bg-light">
          <tr>
            <th>Tên sản phẩm</th>
            <th className="text-center">Số lượng</th>
            <th className="text-end">Đơn giá</th>
            <th className="text-end">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((p, idx) => (
            <tr key={idx}>
              <td>{p.name}</td>
              <td className="text-center">{p.quantity}</td>
              <td className="text-end">{p.price.toLocaleString()}.000đ</td>
              <td className="text-end">{(p.price * p.quantity).toLocaleString()}.000đ</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end fw-bold">Tổng cộng:</td>
            <td className="text-end fw-bold text-danger">{totalAmount.toLocaleString()}.000đ</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderDetail;