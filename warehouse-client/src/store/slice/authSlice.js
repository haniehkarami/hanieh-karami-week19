import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../services/api";

export const registerUser = createAsyncThunk(
  "َauth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      console.log("Data being sent to backend:", userData);
      const res = await API.post("/api/auth/register", userData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await API.post("/api/auth/login", userData);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      return res.data;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.user) {
          state.user = action.payload.user;
        }
        if (action.payload.token) {
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Registration failed! ";
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Login failed! ";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
