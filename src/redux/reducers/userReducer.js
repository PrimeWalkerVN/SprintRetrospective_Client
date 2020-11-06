import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    logged: false
  },
  reducers: {
    setUserLogin: (state, action) => {
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
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setLogged: (state, action) => {
      state.logged = action.payload;
    }
  }
});

const { reducer: userReducer, actions } = userSlice;
export const { setUser, setUserLogin, setLogged, logout } = actions;
export default userReducer;
