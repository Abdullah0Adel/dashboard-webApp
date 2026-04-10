import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './features/theme/themeSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        theme: themeReducer,
    },
      middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware), // ✅ جديد
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']




