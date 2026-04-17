import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend
} from "recharts";

const Dashboard = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  // stats.products bây giờ sẽ đại diện cho tổng số lượng sản phẩm đã bán
  const [stats, setStats] = useState({ products: 0, orders: 0, customers: 0, totalRevenue: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProducts, resOrders, resCustomers] = await Promise.all([
          axios.get("http://localhost:3000/products"),
          axios.get("http://localhost:3000/orders"),
          axios.get("http://localhost:3000/customers")
        ]);

        const orders = resOrders.data;
        const customers = resCustomers.data;

        // 1. Tính tổng doanh thu và Tổng số lượng sản phẩm đã bán
        let totalSoldQuantity = 0;
        const totalRev = orders.reduce((sum, order) => {
          // Tính tiền của đơn hàng (KHÔNG nhân với 1000 nữa vì dữ liệu đã đúng)
          const orderPrice = order.price || order.products.reduce((pSum, p) => pSum + (p.price * p.quantity), 0);
          
          // Cộng dồn số lượng sản phẩm trong đơn hàng này vào tổng sold
          if (order.products) {
            order.products.forEach(p => {
              totalSoldQuantity += p.quantity; 
            });
          }
          
          return sum + orderPrice; // Bỏ * 1000
        }, 0);

        setStats({
          products: totalSoldQuantity,
          orders: orders.length,
          customers: customers.length,
          totalRevenue: totalRev
        });

        // 2. Biểu đồ doanh thu
        const dailyRevenue = {};
        orders.forEach(order => {
          const date = order.createdDate || "Không xác định"; 
          const orderPrice = order.price || order.products.reduce((pSum, p) => pSum + (p.price * p.quantity), 0);
          dailyRevenue[date] = (dailyRevenue[date] || 0) + orderPrice; // Bỏ * 1000
        });

        const formattedRevenue = Object.entries(dailyRevenue).map(([date, amount]) => ({
          date,
          amount
        })).sort((a, b) => new Date(a.date) - new Date(b.date));
        setRevenueData(formattedRevenue);

        // 3. Xử lý sản phẩm bán chạy
        const productSales = {};
        orders.forEach(order => {
          if (order.products) {
            order.products.forEach(p => {
              productSales[p.name] = (productSales[p.name] || 0) + p.quantity;
            });
          }
        });

        const sortedProducts = Object.entries(productSales)
          .map(([name, sales]) => ({ name, sales }))
          .sort((a, b) => b.sales - a.sales)
          .slice(0, 5);
        setBestSellers(sortedProducts);

      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thống kê:", error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <h2 className="fw-bold mb-4 text-dark">Bảng Điều Khiển Hệ Thống</h2>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-primary text-white p-3">
            <h6>Tổng Doanh Thu</h6>
            <h3>{stats.totalRevenue.toLocaleString('vi-VN')} đ</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-success text-white p-3">
            <h6>Đơn Hàng</h6>
            <h3>{stats.orders}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-warning text-white p-3">
            <h6>Sản Phẩm Đã Bán</h6>
            <h3>{stats.products}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-info text-white p-3">
            <h6>Khách Hàng</h6>
            <h3>{stats.customers}</h3>
          </div>
        </div>
      </div>
      
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h5 className="fw-bold mb-4">Thống kê doanh thu theo thời gian</h5>
            <div style={{ width: "100%", height: 350 }}>
              <ResponsiveContainer>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(value) => value.toLocaleString('vi-VN')} />
                  <Tooltip formatter={(value) => value.toLocaleString('vi-VN') + " đ"} />
                  <Legend />
                  <Line type="monotone" dataKey="amount" name="Doanh thu" stroke="#0d6efd" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h5 className="fw-bold mb-4">Top 5 sản phẩm bán chạy</h5>
            <div style={{ width: "100%", height: 350 }}>
              <ResponsiveContainer>
                <BarChart data={bestSellers} layout="horizontal"> {/* Đổi layout thành horizontal */}
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" type="category" tick={{ fontSize: 12, angle: -15, textAnchor: "end", height: 60 }} /> {/* XAxis cho tên sản phẩm */}
                  <YAxis type="number" /> {/* YAxis cho số lượng */}
                  <Tooltip formatter={(value) => `${value} sản phẩm`} />
                  <Bar dataKey="sales" name="Số lượng bán" fill="#198754" radius={[5, 5, 0, 0]}>
                    {bestSellers.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;