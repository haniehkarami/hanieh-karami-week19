import { Link } from "react-router-dom";
import { FaWarehouse, FaPhone, FaEnvelope } from "react-icons/fa";
import styles from "./Layout.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
   
        <div className={styles.footerSection}>
          <div className={styles.footerLogo}>
            <FaWarehouse />
            <span>سامانه انبار</span>
          </div>
          <p>مدیریت هوشمند محصولات و موجودی انبار</p>
        </div>

 
        <div className={styles.footerSection}>
          <h4>دسترسی سریع</h4>
          <Link to="/" className={styles.footerLink}>صفحه اصلی</Link>
          <Link to="/products" className={styles.footerLink}>محصولات</Link>
          <Link to="/login" className={styles.footerLink}>ورود به سیستم</Link>
        </div>

      
        <div className={styles.footerSection}>
          <h4>تماس با ما</h4>
          <div className={styles.contactInfo}>
            <FaEnvelope />
            <span>info@warehouse.com</span>
          </div>
          <div className={styles.contactInfo}>
            <FaPhone />
            <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
          </div>
        </div>
      </div>

   
      <div className={styles.footerBottom}>
        <p>© ۱۴۰۳ سامانه مدیریت انبار. تمام حقوق محفوظ است.</p>
      </div>
    </footer>
  );
}

export default Footer;