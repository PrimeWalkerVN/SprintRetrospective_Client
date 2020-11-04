import axiosClient from './axiosClient';
const cardsApi = {
  getcards: () => {
    const url = '/cards';
    return axiosClient.get(url);
  },
  deleteCard: id => {
    const url = `/cards/${id}`;
    return axiosClient.delete(url);
  },
  editCard: (id, params) => {
    const url = `/cards/${id}`;
    return axiosClient.put(url, params);
  }
};

export default cardsApi;
