import axiosClient from './axiosClient';
const boardsApi = {
  getBoards: () => {
    const url = '/boards';
    return axiosClient.get(url);
  }
};

export default boardsApi;
