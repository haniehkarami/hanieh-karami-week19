import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import styles from "./Modal.module.css";
import API from "../services/api";
import { fetchProducts } from "../store/slice/productsSlice";

function EditProductModal({ product, onClose }) {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || "");
  const [quantity, setQuantity] = useState(product?.quantity || "");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !quantity || !price) {
      toast.error("لطفا همه فیلدها را کامل کنید");
      return;
    }
    try {
      await API.put(`/api/products/${product.id}`, {
        name,
        price: Number(price),
        quantity: Number(quantity),
      });
      toast.success("محصول با موفقیت ویرایش شد");

      await dispatch(fetchProducts()).unwrap();
      onClose();
    } catch (error) {
      toast.error("خطا در ویرایش محصول");
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modalBox}>
        <h3>ویرایش اطلاعات</h3>
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
          <button type="submit">ثبت اطلاعات جدید</button>
          <button type="button" onClick={onClose}>
            انصراف
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
