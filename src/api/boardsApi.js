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
  },
  createList: (id, params) => {
    const url = `/boards/${id}/lists`;
    return axiosClient.post(url, params);
  },
  getLists: id => {
    const url = `/boards/${id}/lists`;
    return axiosClient.get(url);
  },
  editBoard: (id, params) => {
    const url = `/boards/${id}`;
    return axiosClient.put(url, params);
  }
};

export default boardsApi;
