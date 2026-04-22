import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './features/theme/themeSlice'
import productsReducer from './features/products/productsSlice'
import { productsApi } from './features/products/productsApi'
import { authApi } from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";

export const makeStore = () => {
  return configureStore({
  reducer: {
    auth: authReducer,
    theme:                       themeReducer,
    products:                    productsReducer,
    [productsApi.reducerPath]:   productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(productsApi.middleware, authApi.middleware),
});

  
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];