import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const AdminLayout = () => {
  return (
    <div className="d-flex">
      <Nav />
      <main className="flex-grow-1 p-4 bg-light" style={{ minHeight: "100vh" }}>
        {/* Header hiển thị thông tin user [cite: 45] */}
        <header className="d-flex justify-content-end mb-4 p-3 bg-white shadow-sm rounded">
          <div className="d-flex align-items-center">
            <span className="me-2 fw-bold">Xin chào, Vinh</span>
            <img src="https://via.placeholder.com/40" className="rounded-circle" alt="avatar" />
          </div>
        </header>
        <Outlet /> {/* Nơi hiển thị các trang con */}
      </main>
    </div>
  );
};
export default AdminLayout;