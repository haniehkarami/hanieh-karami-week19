import { Link, useLocation } from "react-router-dom";
import { FaWarehouse, FaHome, FaBox, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import styles from "./Layout.module.css";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>

        <Link to="/" className={styles.logo}>
          <FaWarehouse />
          <span>سامانه انبار</span>
        </Link>

      
        <nav className={styles.nav}>
          <Link 
            to="/" 
            className={`${styles.navLink} ${location.pathname === "/" ? styles.active : ""}`}
          >
            <FaHome />
            صفحه اصلی
          </Link>
          <Link 
            to="/products" 
            className={`${styles.navLink} ${location.pathname === "/products" ? styles.active : ""}`}
          >
            <FaBox />
            مدیریت محصولات
          </Link>
        </nav>


        <div className={styles.userInfo}>
          <FaUserCircle className={styles.userIcon} />
          <div className={styles.userDetails}>
            <span className={styles.username}>{user?.username || "میهمان"}</span>
            <span className={styles.role}>{user?.role || "کاربر"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;