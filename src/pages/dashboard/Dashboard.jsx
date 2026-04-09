import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const Dashboard = () => {
  const [dataChart, setDataChart] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [stats, setStats] = useState({ revenue: 0, orders: 0, customers: 0 });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Hàm bổ trợ để định dạng tiền tệ (Nhân 1000 và thêm dấu chấm)
  const formatVND = (amount) => {
    return (amount * 1000).toLocaleString('vi-VN') + "đ";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resOrders, resCustomers] = await Promise.all([
          axios.get("http://localhost:3000/orders"),
          axios.get("http://localhost:3000/customers"),
        ]);

        const orders = resOrders.data;

        // 1. Tính doanh thu (Lọc đơn Hoàn Thành và nhân 1000 để ra giá trị thực)
        const totalRevenue = orders
          .filter(o => o.status === "Hoàn Thành")
          .reduce((sum, o) => sum + o.products.reduce((s, p) => s + (p.price * p.quantity), 0), 0);
        
        setStats({
          revenue: totalRevenue,
          orders: orders.length,
          customers: resCustomers.data.length
        });

        // 2. Dữ liệu biểu đồ đường
        const chartMapped = orders.map((o) => ({
          name: `Đơn ${o.id}`,
          // Ở đây giữ nguyên giá trị gốc để Recharts vẽ cột, Tooltip sẽ format sau
          total: o.products.reduce((s, p) => s + (p.price * p.quantity), 0) * 1000 
        }));
        setDataChart(chartMapped);

        // 3. Dữ liệu biểu đồ tròn
        const statusCounts = {};
        orders.forEach(o => {
          statusCounts[o.status] = (statusCounts[o.status] || 0) + 1;
        });
        const pieMapped = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
        setPieData(pieMapped);

      } catch (error) {
        console.error("Lỗi fetch data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid p-4">
      <h3 className="mb-4 fw-bold">THỐNG KÊ HỆ THỐNG</h3>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white shadow-sm border-0">
            <div className="card-body">
              <h6 className="small">TỔNG DOANH THU</h6>
              {/* Hiển thị định dạng 250.000đ */}
              <h3 className="fw-bold">{formatVND(stats.revenue)}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white shadow-sm border-0">
            <div className="card-body">
              <h6 className="small">TỔNG ĐƠN HÀNG</h6>
              <h3 className="fw-bold">{stats.orders} đơn</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-dark shadow-sm border-0">
            <div className="card-body">
              <h6 className="small">KHÁCH HÀNG</h6>
              <h3 className="fw-bold">{stats.customers} thành viên</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card shadow-sm p-3 border-0">
            <h5 className="mb-4">Biểu đồ biến động doanh thu</h5>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={dataChart}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${value/1000}k`} />
                  <Tooltip formatter={(value) => [value.toLocaleString('vi-VN') + "đ", "Doanh thu"]} />
                  <Line type="monotone" dataKey="total" stroke="#0d6efd" strokeWidth={3} dot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-3 border-0">
            <h5 className="mb-4">Trạng thái đơn hàng</h5>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;