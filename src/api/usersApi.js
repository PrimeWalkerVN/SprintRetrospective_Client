import axiosClient from './axiosClient';
const usersApi = {
  login: params => {
    const url = '/users/login';
    return axiosClient.post(url, params);
  },
  getMe: () => {
    const url = '/users/me';
    return axiosClient.get(url);
  },
  register: params => {
    const url = '/users/signup';
    return axiosClient.post(url, params);
  },
  loginWithGoogle: () => {
    const url = '/users/auth/google';
    return axiosClient.get(url);
  }
};

export default usersApi;