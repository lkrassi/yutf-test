import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { products } from '../data/products'

export const loadProducts = createAsyncThunk('products/load', async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return products
})

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
  },
})

export const selectProducts = (state) => state.products.items
export const selectProductsLoading = (state) => state.products.loading

export default productsSlice.reducer
