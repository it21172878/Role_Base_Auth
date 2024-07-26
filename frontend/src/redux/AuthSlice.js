import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: null,
  error: null,
  user: null,
};
const AuthSlice = createSlice({
  name: 'authslice',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default AuthSlice.reducer;
