import { useEffect, useMemo, useState } from "react";
import { FaEdit, FaSearch, FaTrash, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AddProductMpdal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";
import DeleteProductModal from "../components/DeleteProductModal";

import { deleteProduct, fetchProducts } from "../store/slice/productsSlice";
import API from "../services/api";
import styles from "./Products.module.css";



function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productsState = useSelector((state) => state.products);
  const { products = [], loading, error } = productsState;
  const authState = useSelector((state) => state.auth);
  
  const { user, token } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) {
      console.error("Products is not :", products);
      return [];
    }
    return products.filter(
      (product) =>
        product.name &&
        product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


 useEffect(() => {
      setCurrentPage(1);
    }, [search]);
    
    useEffect(() => {
      const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(1);
      }
    }, [filteredProducts, currentPage]);



  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);



  if (loading) return <p> در حال بارگزاری ... </p>;
  if (error) return <p> خطا : {error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="جستجو کالا"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userDivider}></div>
          <FaUserCircle />
          <span>
            <h3>{user?.username}</h3>
            <h4>{user?.role}</h4>
          </span>
        </div>
      </div>
      <div className={styles.actionBar}>
        <div>
          <FaEdit />
          <h2>مدیریت کالا</h2>
        </div>
        <button onClick={() => setShowAddModal(true)}>افزودن محصول</button>
        {showAddModal && (
          <AddProductMpdal onClose={() => setShowAddModal(false)} />
        )}
        {showEditModal && selectedProduct && (
          <EditProductModal
            product={selectedProduct}
            onClose={() => {
              setShowEditModal(false);
              setSelectedProduct(null);
            }}
          />
        )}
        {showDeleteModal && selectedProduct && (
          <DeleteProductModal
            product={selectedProduct}
            onClose={() => setShowDeleteModal(false)}
          />
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>نام کالا</th>
            <th>موجودی</th>
            <th>قیمت</th>
            <th>شناسه</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price.toLocaleString()} تومان </td>
              <td className={styles.idCell}>{product.id.slice(0, 8)}...</td>
              <td>
                <FaEdit
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowEditModal(true);
                  }}
                />
                <FaTrash
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowDeleteModal(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredProducts.length > 0 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <div
              key={page}
              className={`${styles.pageNumber} ${
                page === currentPage ? styles.active : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </div>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className={styles.emptyState}>
          <p>هیچ محصولی یافت نشد</p>
          <button
            className={styles.addBtn}
            onClick={() => setShowAddModal(true)}
          >
            افزودن اولین محصول
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;
