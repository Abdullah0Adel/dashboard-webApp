import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './features/theme/themeSlice'
import productsReducer from './features/products/productsSlice'
import { productsApi } from './features/products/productsApi'

export const makeStore = () => {
  return configureStore({
  reducer: {
    theme:                       themeReducer,
    products:                    productsReducer,
    [productsApi.reducerPath]:   productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];