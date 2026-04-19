import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from './types'
import { RootState } from '../../store'

interface ProductsState {
  selectedProduct: Product | null
  isFormOpen: boolean
  filters: {
    color: string
    size: string
  }
}

const initialState: ProductsState = {
  selectedProduct: null,
  isFormOpen: false,
  filters: {
    color: '',
    size: '',
  },
}

const productsSlice = createSlice({
  name: 'products',
  initialState,

  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload
    },

    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    },

    setFilter: (
      state,
      action: PayloadAction<{ key: keyof ProductsState['filters']; value: string }>
    ) => {
      state.filters[action.payload.key] = action.payload.value
    },

    clearFilters: (state) => {
      state.filters = { color: '', size: '' }
    },

    toggleForm: (state) => {
      state.isFormOpen = !state.isFormOpen
    },

    closeForm: (state) => {
      state.isFormOpen = false
    },
  },
})

export const {
  setSelectedProduct,
  clearSelectedProduct,
  setFilter,
  clearFilters,
  toggleForm,
  closeForm,
} = productsSlice.actions

// ✅ Selectors
export const selectSelectedProduct = (state: RootState) => state.products.selectedProduct
export const selectFilters         = (state: RootState) => state.products.filters
export const selectIsFormOpen      = (state: RootState) => state.products.isFormOpen

export default productsSlice.reducer