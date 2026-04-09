import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // Load dữ liệu cũ khi Sửa [cite: 11]
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/products/${id}`)
        .then(res => res.json())
        .then(data => {
          Object.keys(data).forEach(key => setValue(key, data[key]));
        });
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const method = id ? "PUT" : "POST";
    const url = id ? `http://localhost:3000/products/${id}` : "http://localhost:3000/products";
    
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    
    alert(id ? "Cập nhật thành công!" : "Thêm mới thành công!"); 
    navigate("/products");
  };

  return (
    <div className="card p-4 shadow-sm border-0">
      <h3 className="mb-4 text-primary">{id ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input {...register("name", { required: "Tên không được để trống", minLength: { value: 5, message: "Tên ít nhất 5 ký tự" } })} className="form-control" />
          {errors.name && <small className="text-danger">{errors.name.message}</small>} 
        </div>

        <div className="mb-3">
          <label className="form-label">Đường dẫn ảnh (URL)</label> 
          <input {...register("image", { required: "Vui lòng nhập URL ảnh" })} className="form-control" />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Giá (VNĐ)</label>
            <input type="number" {...register("price", { required: "Nhập giá", min: 0 })} className="form-control" />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Danh mục</label> 
            <select {...register("category", { required: "Chọn danh mục" })} className="form-select">
              <option value="">-- Chọn --</option>
              <option value="Quần áo">Quần áo</option>
              <option value="Giày dép">Giày dép</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label d-block">Trạng thái</label> 
          <div className="form-check form-check-inline">
            <input {...register("status")} className="form-check-input" type="radio" value="Hoạt động" defaultChecked />
            <label className="form-check-label">Hoạt động</label>
          </div>
          <div className="form-check form-check-inline">
            <input {...register("status")} className="form-check-input" type="radio" value="Không hoạt động" />
            <label className="form-check-label">Không hoạt động</label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary px-4">Lưu lại</button>
      </form>
    </div>
  );
};
export default ProductForm;