import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // 1. Gọi API lấy danh sách user khớp với username và password
      const res = await axios.get(
        `http://localhost:3000/users?username=${data.username}&password=${data.password}`,
      );

      // 2. Vì json-server trả về mảng, ta lấy phần tử đầu tiên
      const user = res.data[0];

      if (user) {
        // Đăng nhập thành công
        localStorage.setItem("user", JSON.stringify(user));
        alert("Đăng nhập thành công!");
        navigate("/"); // Chuyển hướng về trang chủ
        window.location.reload(); // Reload để Nav cập nhật lại thông tin "Xin chào"
      } else {
        // Không tìm thấy user nào khớp
        setError("loginError", {
          message: "Tên đăng nhập hoặc mật khẩu không đúng!",
        });
      }
    } catch (error) {
      console.error(error);
      alert("Không thể kết nối đến server (Hãy chắc chắn đã chạy json-server)");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg border-0" style={{ width: "400px" }}>
        <h2 className="text-center text-primary mb-4 fw-bold">ĐĂNG NHẬP</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Tên đăng nhập</label>
            <input
              {...register("username", { required: "Vui lòng nhập username" })}
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
            />
            {errors.username && (
              <small className="text-danger">{errors.username.message}</small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Mật khẩu</label>
            <input
              type="password"
              {...register("password", { required: "Vui lòng nhập mật khẩu" })}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>
          {errors.loginError && (
            <div className="alert alert-danger p-2">
              {errors.loginError.message}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold py-2 mt-2"
          >
            ĐĂNG NHẬP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
