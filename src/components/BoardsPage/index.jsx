import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import boardsApi from '../../api/boardsApi';
import { setIsLoading } from '../../redux/reducers/loadingReducer';
import Notification from '../GlobalComponents/Notification';
import AddBoard from './AddBoard';
import BoardList from './BoardList';

const BoardsPage = () => {
  const [boards, setBoards] = useState([]);
  const [filters, setFilters] = useState({ action: false });
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  useEffect(() => {
    const getBoards = async () => {
      dispatch(setIsLoading(true));
      try {
        const boardsRes = await boardsApi.getBoards();
        setBoards(boardsRes.data.reverse());
      } catch (err) {
        Notification('error', 'error', err.message);
      }
      dispatch(setIsLoading(false));
    };

    getBoards();
  }, [filters, dispatch]);

  const createListsDefault = async id => {
    const params1 = { name: 'Went Well' };
    const params2 = { name: 'To Improve' };
    const params3 = { name: 'Action items' };
    await boardsApi.createList(id, params1);
    await boardsApi.createList(id, params2);
    await boardsApi.createList(id, params3);
  };

  const addBoardHandler = async params => {
    dispatch(setIsLoading(true));
    try {
      params.userId = user._id;
      const res = await boardsApi.addBoard(params);
      await createListsDefault(res.data._id);
      setFilters({ action: !filters.action });
      Notification('success', 'Add board success', res.data.name);
    } catch (err) {
      Notification('error', 'error', err.message);
    }
    dispatch(setIsLoading(false));
  };
  const editBoardHandler = async (id, params) => {
    dispatch(setIsLoading(true));
    try {
      const res = await boardsApi.editBoard(id, params);
      setFilters({ action: !filters.action });
      Notification('success', 'Edit board success', res.data.name);
    } catch (err) {
      Notification('error', 'error', err.message);
    }
    dispatch(setIsLoading(false));
  };
  const deleteBoardHandler = async id => {
    dispatch(setIsLoading(true));
    try {
      const res = await boardsApi.deleteBoard(id);
      setFilters({ add: !filters.add });
      Notification('success', 'Delete board', res.message);
    } catch (err) {
      Notification('error', 'error', err.message);
    }
    dispatch(setIsLoading(false));
  };
  return (
    <div className="w-full pt-12 flex flex-col">
      <div className="text-center text-4xl text-purple-800">MY BOARDS</div>
      <div className="flex flex-row w-full justify-between px-10 pt-10">
        <div style={{ flex: 0.2 }}>
          <AddBoard color="purple" handleSubmit={addBoardHandler} />
        </div>
        <div style={{ flex: 0.8 }} className="flex flex-wrap px-10 w-full">
          <BoardList data={boards} deleteBoardSubmit={deleteBoardHandler} editBoardSubmit={editBoardHandler} />
        </div>
      </div>
    </div>
  );
};

export default BoardsPage;
