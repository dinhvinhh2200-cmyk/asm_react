import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.get(`http://localhost:3000/users?username=${data.username}&password=${data.password}`);
      if (res.data.length > 0) {
        const user = res.data[0];
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        setError("loginError", { type: "manual", message: "Sai username hoặc password!" });
      }
    } catch (error) {
      alert("Lỗi kết nối server!");
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
            {errors.username && <small className="text-danger">{errors.username.message}</small>}
          </div>
          <div className="mb-3">
            <label className="form-label">Mật khẩu</label>
            <input 
              type="password" 
              {...register("password", { required: "Vui lòng nhập mật khẩu" })} 
              className={`form-control ${errors.password ? "is-invalid" : ""}`} 
            />
            {errors.password && <small className="text-danger">{errors.password.message}</small>}
          </div>
          {errors.loginError && <div className="alert alert-danger p-2">{errors.loginError.message}</div>}
          <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mt-2">ĐĂNG NHẬP</button>
        </form>
      </div>
    </div>
  );
};

export default Login;