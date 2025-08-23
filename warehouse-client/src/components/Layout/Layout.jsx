import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import styles from "./Layout.module.css";

function Layout({ children }) {
  const location = useLocation();

  const noLayoutPages = ["/login", "/register"];
  const shouldShowLayout = !noLayoutPages.includes(location.pathname);

  return (
    <div className={styles.layout}>
      {shouldShowLayout && <Header />}
      <main className={styles.main}>{children}</main>
      {shouldShowLayout && <Footer />}
    </div>
  );
}

export default Layout;
