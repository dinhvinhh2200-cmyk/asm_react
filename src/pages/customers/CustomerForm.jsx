import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const CustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/customers/${id}`)
        .then(res => {
          Object.keys(res.data).forEach(key => setValue(key, res.data[key]));
        });
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.get("http://localhost:3000/customers");
      const allCustomers = response.data;

      // Kiểm tra trùng số điện thoại
      const isDuplicatePhone = allCustomers.some(c => c.phone === data.phone && c.id != id);
      if (isDuplicatePhone) {
        setError("phone", { type: "manual", message: "Số điện thoại này đã được sử dụng!" });
        return;
      }

      if (id) {
        await axios.put(`http://localhost:3000/customers/${id}`, data);
        alert("Cập nhật khách hàng thành công!");
      } else {
        await axios.post("http://localhost:3000/customers", data);
        alert("Thêm khách hàng thành công!");
      }
      navigate("/customers");
    } catch (error) {
      alert("Có lỗi xảy ra!");
    }
  };

  return (
    <div className="card p-4 shadow-sm border-0">
      <h3 className="mb-4 text-primary">{id ? "Cập nhật khách hàng" : "Thêm khách hàng mới"}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Họ tên</label>
            <input 
              {...register("name", { required: "Vui lòng nhập họ tên" })} 
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            />
            {errors.name && <small className="text-danger">{errors.name.message}</small>}
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Ngày sinh</label>
            <input 
              type="date" 
              {...register("birthday", { required: "Vui lòng chọn ngày sinh" })} 
              className={`form-control ${errors.birthday ? 'is-invalid' : ''}`}
            />
            {/* THÊM HIỂN THỊ LỖI NGÀY SINH */}
            {errors.birthday && <small className="text-danger">{errors.birthday.message}</small>}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Số điện thoại</label>
            <input 
              {...register("phone", { 
                required: "Nhập số điện thoại", 
                pattern: { value: /^[0-9]{10}$/, message: "Số điện thoại phải có 10 chữ số" } 
              })} 
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            />
            {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label d-block">Giới tính</label>
            <div className={`p-2 border rounded ${errors.gender ? 'border-danger' : ''}`}>
               {/* Bao bọc radio để dễ nhận diện vùng lỗi */}
              <div className="form-check form-check-inline">
                <input {...register("gender", { required: "Vui lòng chọn giới tính" })} className="form-check-input" type="radio" value="Nam" id="genderNam" />
                <label className="form-check-label" htmlFor="genderNam">Nam</label>
              </div>
              <div className="form-check form-check-inline">
                <input {...register("gender", { required: "Vui lòng chọn giới tính" })} className="form-check-input" type="radio" value="Nữ" id="genderNu" />
                <label className="form-check-label" htmlFor="genderNu">Nữ</label>
              </div>
              <div className="form-check form-check-inline">
                <input {...register("gender", { required: "Vui lòng chọn giới tính" })} className="form-check-input" type="radio" value="Khác" id="genderKhac" />
                <label className="form-check-label" htmlFor="genderKhac">Khác</label>
              </div>
            </div>
            {errors.gender && <small className="text-danger d-block">{errors.gender.message}</small>}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Địa chỉ</label>
          <textarea 
            {...register("address", { required: "Nhập địa chỉ" })} 
            className={`form-control ${errors.address ? 'is-invalid' : ''}`} // THÊM class is-invalid
            rows="2"
          ></textarea>
          {/* THÊM HIỂN THỊ LỖI ĐỊA CHỈ */}
          {errors.address && <small className="text-danger">{errors.address.message}</small>}
        </div>

        <button type="submit" className="btn btn-primary px-4">Lưu dữ liệu</button>
        <button type="button" className="btn btn-secondary px-4 ms-2" onClick={() => navigate("/customers")}>Hủy</button>
      </form>
    </div>
  );
};

export default CustomerForm;