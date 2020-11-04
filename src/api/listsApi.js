import axiosClient from './axiosClient';
const listsApi = {
  getLists: () => {
    const url = '/lists';
    return axiosClient.get(url);
  },
  addList: params => {
    const url = '/lists';
    return axiosClient.post(url, params);
  },
  deleteList: id => {
    const url = `/lists/${id}`;
    return axiosClient.delete(url);
  },
  getCards: id => {
    const url = `/lists/${id}/cards`;
    return axiosClient.get(url);
  },
  addCard: (id, params) => {
    const url = `/lists/${id}/cards`;
    return axiosClient.post(url, params);
  }
};

export default listsApi;
