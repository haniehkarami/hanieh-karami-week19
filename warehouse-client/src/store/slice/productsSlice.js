import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/products");
      console.log("API Response:", res.data); 
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || " خطا در دریافت محصول"
      );
    }
  }
);
 

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/api/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || " خطا در حذف محصول"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products:[],
    loading: false,
    error: null,
    totalProducts: 0,
    page: 1,
    totalPages: 1
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.totalProducts = action.payload.totalProducts;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});
export default productSlice.reducer;
