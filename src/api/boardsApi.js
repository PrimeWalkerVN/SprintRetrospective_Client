import axiosClient from './axiosClient';
const boardsApi = {
  getBoards: () => {
    const url = '/boards';
    return axiosClient.get(url);
  },
  addBoard: params => {
    const url = '/boards';
    return axiosClient.post(url, params);
  },
  deleteBoard: id => {
    const url = `/boards/${id}`;
    return axiosClient.delete(url);
  }
};

export default boardsApi;
