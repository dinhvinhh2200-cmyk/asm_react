import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios"; //

const ProductForm = () => {
  const { id } = useParams(); //
  const navigate = useNavigate(); //
  const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm(); //

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/products/${id}`) //
        .then(res => {
          Object.keys(res.data).forEach(key => setValue(key, res.data[key])); //
        })
        .catch(err => console.error("Lỗi tải chi tiết:", err));
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      // 1. Lấy danh sách tất cả sản phẩm để kiểm tra trùng tên
      const response = await axios.get("http://localhost:3000/products");
      const allProducts = response.data;

      // 2. Kiểm tra trùng tên (không phân biệt hoa thường)
      // Nếu đang sửa (id tồn tại), loại trừ sản phẩm hiện tại ra khỏi danh sách kiểm tra
      const isDuplicate = allProducts.some(p => 
        p.name.toLowerCase().trim() === data.name.toLowerCase().trim() && p.id != id
      );

      if (isDuplicate) {
        // Hiển thị lỗi ngay tại ô nhập tên sản phẩm
        setError("name", { type: "manual", message: "Tên sản phẩm này đã tồn tại!" });
        return;
      }

      // 3. Xử lý dữ liệu chuẩn
      const { id: _, ...restData } = data;
      const formattedData = {
        ...restData,
        price: Number(data.price), //
        name: data.name.trim() // Xóa khoảng trắng thừa
      };

      if (id) {
        await axios.put(`http://localhost:3000/products/${id}`, formattedData); //
      } else {
        await axios.post("http://localhost:3000/products", formattedData); //
      }
      
      alert(id ? "Cập nhật thành công!" : "Thêm mới thành công!"); //
      navigate("/products"); //
    } catch (error) {
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className="card p-4 shadow-sm border-0">
      <h3 className="mb-4 text-primary">{id ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input 
            {...register("name", { 
              required: "Tên không được để trống", 
              minLength: { value: 5, message: "Tên ít nhất 5 ký tự" } 
            })} 
            className={`form-control ${errors.name ? 'is-invalid' : ''}`} //
          />
          {errors.name && <small className="text-danger">{errors.name.message}</small>} 
        </div>

        <div className="mb-3">
          <label className="form-label">Đường dẫn ảnh (URL)</label> 
          <input {...register("image", { required: "Vui lòng nhập URL ảnh" })} className="form-control" /> {/* */}
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Giá (VNĐ)</label>
            <input type="number" {...register("price", { required: "Nhập giá", min: 0 })} className="form-control" /> {/* */}
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Danh mục</label> 
            <select {...register("category", { required: "Chọn danh mục" })} className="form-select"> {/* */}
              <option value="">-- Chọn --</option>
              <option value="Áo">Áo</option>
              <option value="Quần">Quần</option>
              <option value="Giày">Giày</option>
              <option value="Phụ kiện">Phụ kiện</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label d-block">Trạng thái</label> 
          <div className="form-check form-check-inline">
            <input {...register("status")} className="form-check-input" type="radio" value="Hoạt động" defaultChecked /> {/* */}
            <label className="form-check-label">Hoạt động</label>
          </div>
          <div className="form-check form-check-inline">
            <input {...register("status")} className="form-check-input" type="radio" value="Không hoạt động" /> {/* */}
            <label className="form-check-label">Không hoạt động</label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary px-4">Lưu lại</button> {/* */}
        <button type="button" className="btn btn-secondary px-4 ms-2" onClick={() => navigate("/products")}>Hủy</button>
      </form>
    </div>
  );
};
export default ProductForm;