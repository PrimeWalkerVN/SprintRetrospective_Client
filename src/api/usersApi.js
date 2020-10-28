import axiosClient from './axiosClient';
const usersApi = {
  login: params => {
    const url = '/users/login';
    return axiosClient.post(url, params);
  }
};

export default usersApi;
