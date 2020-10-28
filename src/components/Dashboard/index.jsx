import React, { useEffect, useState } from 'react';
import boardsApi from '../../api/boardsApi';
import Header from '../GlobalComponents/Header';
import AddBoard from './AddBoard';
import ListBoard from './ListBoard';
import Notification from '../Notification';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading } from '../../redux/reducers/loadingReducer';
import { logout } from '../../redux/reducers/userReducer';

const DashBoard = () => {
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

  const addBoardHandler = async params => {
    dispatch(setIsLoading(true));
    try {
      params.userId = user._id;
      const res = await boardsApi.addBoard(params);
      setFilters({ action: !filters.action });
      Notification('success', 'Add board success', res.data.name);
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

  const logoutHandler = () => {
    dispatch(logout(user));
  };
  return (
    <header className="w-full">
      <Header name="Sprint Retrospective" logoutHandler={logoutHandler} />
      <div className="w-full pt-12 flex flex-col">
        <div className="text-center text-4xl text-purple-800">MY BOARDS</div>
        <div className="flex flex-row w-full justify-between px-10 pt-10">
          <div style={{ flex: 0.2 }}>
            <AddBoard color="purple" handleSubmit={addBoardHandler} />
          </div>
          <div style={{ flex: 0.8 }} className="flex flex-wrap px-10 w-full">
            <ListBoard data={boards} deleteBoardSubmit={deleteBoardHandler} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashBoard;
