import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/slice/authSlice";

import styles from "../styles/Form.module.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(registerUser(data)).unwrap().then(()=> {
      navigate("/products");
    })
    .catch((error) => {console.error("Registration failed:", error)}
    )
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formBox}>
        <h2>فرم ثبت نام</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            type="text"
            placeholder="نام کاربری"
            {...register("username", { required: "نام کاربری الزامی است" })}
          />
          <span>{errors.username && <p>{errors.username.message}</p>}</span>

          <input
            type="password"
            placeholder="رمز عبور"
            {...register("password", {
              required: "رمز عبور الزامی است",
              minLength: {
                value: 6,
                message: "رمز عبور باید حداقل 6 کاراکتر باشد",
              },
            })}
          />
          <span>{errors.password && <p>{errors.password.message}</p>}</span>

          <input
            type="password"
            placeholder="تکرار رمز عبور"
            {...register("confirmPassword", {
              required: " تکرار رمز عبور الزامی است",
              validate: (value) =>
                value === watch("password") || " رمز عبور مطابقت ندارد",
            })}
          />
          <span>
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </span>

          <button type="submit" disabled={loading}>
            {loading ? "در حال ارسال" : "ثبت نام"}
          </button>
        </form>
        <p>
          <Link to="/login" className={styles.link}>
            حساب کاربری دارید؟
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
