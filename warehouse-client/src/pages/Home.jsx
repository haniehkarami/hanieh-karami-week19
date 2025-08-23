import React from "react";
import { Link } from "react-router-dom";
import { FaBoxes, FaChartLine, FaUsers, FaSignInAlt, FaUserPlus, FaPlay } from "react-icons/fa";
import styles from "../styles/Home.module.css";


function Home() {
  return (
    <div className={styles.container}>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            مدیریت انبار به روشی هوشمند
          </h1>
          <p className={styles.subtitle}>
            سامانه جامع مدیریت محصولات، موجودی و انبار با پیشرفته‌ترین امکانات
          </p>
          <div className={styles.heroButtons}>
            <Link to="/login" className={styles.primaryButton}>
              <FaSignInAlt />
              ورود به سیستم
            </Link>
            <Link to="/register" className={styles.secondaryButton}>
              <FaUserPlus />
              ثبت نام
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.animatedElement}>
            <div className={styles.cube}></div>
            <div className={styles.cube}></div>
            <div className={styles.cube}></div>
          </div>
        </div>
      </section>


      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2>چرا سامانه ما؟</h2>
          <p>امکانات پیشرفته برای مدیریت حرفه‌ای انبار</p>
        </div>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FaBoxes />
            </div>
            <h3>مدیریت محصولات</h3>
            <p>کنترل کامل اطلاعات محصولات، موجودی و قیمت‌ها به صورت实时</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FaChartLine />
            </div>
            <h3>گزارشات تحلیلی</h3>
            <p>گزارشات دقیق و نمودارهای آماری از عملکرد انبار</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FaUsers />
            </div>
            <h3>مدیریت کاربران</h3>
            <p>سیستم امن با سطوح دسترسی مختلف برای تیم‌های بزرگ</p>
          </div>
        </div>
      </section>

    
      <section className={styles.stats}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>+500</span>
            <span className={styles.statLabel}>محصول فعال</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>99.9%</span>
            <span className={styles.statLabel}>پایداری سیستم</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>+50</span>
            <span className={styles.statLabel}>کاربر روزانه</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>24/7</span>
            <span className={styles.statLabel}>پشتیبانی</span>
          </div>
        </div>
      </section>


      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>آماده شروع هستید؟</h2>
          <p>همین حالا به جمع کسب‌وکارهای موفق بپیوندید</p>
          <Link to="/register" className={styles.ctaButton}>
            <FaPlay />
            شروع کنید
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;