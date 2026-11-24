import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const loadUser = createAsyncThunk('user/load', async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    id: 1,
    name: 'Иван Иванов',
    email: 'ivan@example.com',
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.current = action.payload
    })
  },
})

export const selectUser = (state) => state.user.current

export default userSlice.reducer
