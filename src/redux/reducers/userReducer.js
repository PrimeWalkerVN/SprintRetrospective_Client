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
      const token = action.payload.token;
      localStorage.setItem('access_token', token);
      state.logged = true;
    },
    logout: state => {
      state.user = {};
      state.logged = false;
      localStorage.clear();
    },
    setUserLogged: (state, action) => {
      state.user = action.payload.user;
      state.logged = true;
    }
  }
});

const { reducer: userReducer, actions } = userSlice;
export const { setUser, setUserLogged, logout } = actions;
export default userReducer;
