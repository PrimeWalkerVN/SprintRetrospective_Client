import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    logged: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      const token = action.payload.token;
      localStorage.setItem('access_token', token);
      state.logged = true;
    },
    logout: state => {
      state.user = {};
      state.logged = false;
      localStorage.clear();
    }
  }
});

const { reducer: userReducer, actions } = userSlice;
export const { setUser, logout } = actions;
export default userReducer;
