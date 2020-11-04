import axiosClient from './axiosClient';
const cardsApi = {
  getcards: () => {
    const url = '/cards';
    return axiosClient.get(url);
  },
  deleteCard: id => {
    const url = `/cards/${id}`;
    return axiosClient.delete(url);
  }
};

export default cardsApi;
