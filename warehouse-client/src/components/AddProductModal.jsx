import { useState } from "react";
import { useDispatch } from "react-redux";
import API from "../services/api";
import { toast } from "react-toastify";
import { fetchProducts } from "../store/slice/productsSlice";

import styles from "./Modal.module.css"


                                                                                 
function AddProductMpdal({ onClose }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !quantity || !price) {
      toast.error("لطفا همه فیلدها را کامل کنید");
      return;
    }
    try {
      await API.post("/api/products", { name, price, quantity });
      toast.success("محصول با موفقیت ثبت شد");
      dispatch(fetchProducts());
      onClose();
    } catch (error) {
      toast.error("خطا در ثبت محصول");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modalBox}>
        <h3>ایجاد محصول جدید</h3>
        <form onSubmit={handleSubmit}>
          <p>نام کالا</p>
          <input
            type="text"
            placeholder="نام کالا"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p> تعداد موجودی</p>
          <input
            type="number"
            placeholder=" تعداد"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <p> قیمت</p>
          <input
            type="number"
            placeholder="قیمت "
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button type="submit">ایجاد</button>
          <button type="button" onClick={onClose}>انصراف</button>
        </form>
      </div>
    </div>
  );
}

export default AddProductMpdal;
