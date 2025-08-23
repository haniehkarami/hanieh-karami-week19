import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../store/slice/authSlice";
import { toast } from "react-toastify";

import styles from "../styles/Form.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data being sent:", { username, password });
    dispatch(loginUser({ username, password }))
      .unwrap()
      .then(() => {
        toast.success("ورود موفقیت آمیز بود");
        navigate("/products");
      })
      .catch((error) => {
        toast.error(error || "خطا در ورود");
      });
  };
  return (
    <div className={styles.formContainer}>
      <div className={styles.formBox}>
        <h2>فرم ورود</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
<span></span>
          <input
            type="password"
            placeholder=" رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
<span></span>
          <button type="submit" disabled={loading}>
            {loading ? "در حال ارسال" : " ورود"}
          </button>
        </form>
        <p>
          <Link to="/register" className={styles.link}>
            ایجاد حساب کاربری{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
