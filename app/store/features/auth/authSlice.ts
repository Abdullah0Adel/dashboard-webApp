// store/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, StrapiAuthResponse } from "./types";
import { authApi } from "./authApi";

// ✅ جيب الـ token من localStorage لو موجود (للـ persist)
const initialState: AuthState = {
  user: null,
  token:
    typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // ✅ Logout يمسح كل حاجة
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    },

    setCredentials: (state, action: PayloadAction<StrapiAuthResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.jwt;
    },
  },

  // ✅ extraReducers بتتعامل مع نتيجة الـ API calls تلقائياً
  extraReducers: (builder) => {
    builder
      // لما الـ login ينجح
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.jwt;
        state.error = null;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        // ✅ احفظ الـ token في localStorage
        localStorage.setItem("token", action.payload.jwt);
        
        // ✅ ضيف ده عشان الـ middleware يشوفه
        document.cookie = `token=${action.payload.jwt}; path=/`;

      })
      // لما الـ login يفشل
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        state.error = action.error.message || "فشل تسجيل الدخول";
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;