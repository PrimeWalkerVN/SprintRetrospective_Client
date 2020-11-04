import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import { Row, Col } from 'antd';
import boardsApi from '../../api/boardsApi';
import { setIsLoading } from '../../redux/reducers/loadingReducer';
import { useDispatch } from 'react-redux';
import Notification from '../GlobalComponents/Notification';
import CardsList from './CardsList';
import AddCard from './AddCard';
import listsApi from '../../api/listsApi';
import cardsApi from '../../api/cardsApi';

const BoardDetail = () => {
  const location = useLocation();
  const board = location.state.board;
  const colors = ['blue', 'green', 'purple', 'blue', 'green'];
  const styleLabel = 'text-xl font-bold flex justify-center w-full ';
  const [lists, setLists] = useState([]);
  const [filters, setFilters] = useState({ action: false });
  const dispatch = useDispatch();

  useEffect(() => {
    const getLists = async () => {
      dispatch(setIsLoading(true));
      try {
        const listsRes = await boardsApi.getLists(board._id);
        setLists(listsRes.data);
      } catch (err) {
        Notification('error', 'error', err.message);
      }
      dispatch(setIsLoading(false));
    };

    getLists();
  }, [board, dispatch]);

  const handleAddCards = async (id, params) => {
    dispatch(setIsLoading(true));
    try {
      const res = await listsApi.addCard(id, params);
      setFilters({ action: !filters.action });
      Notification('success', 'Add card success', res.data.name);
    } catch (err) {
      Notification('error', 'error', err.message);
    }
    dispatch(setIsLoading(false));
  };
  const handleEditCard = async (id, params) => {
    dispatch(setIsLoading(true));
    try {
      const res = await cardsApi.editCard(id, params);
      setFilters({ action: !filters.action });
    } catch (err) {
      Notification('error', 'error', err.message);
    }
    dispatch(setIsLoading(false));
  };
  const handleDeleteCard = async id => {
    dispatch(setIsLoading(true));
    try {
      await cardsApi.deleteCard(id);
      setFilters({ action: !filters.action });
    } catch (err) {
      Notification('error', 'error', err.message);
    }
    dispatch(setIsLoading(false));
  };
  return (
    <div className=" w-full overflow-auto h-screen ">
      <NavBar name={board.name} />
      <Row gutter={[16, 16]}>
        {lists.map((item, index) => (
          <Col span={8}>
            <div className={styleLabel + `bg-${colors[index]}-100`}>{item.name}</div>
          </Col>
        ))}
      </Row>
      <Row gutter={[16, 16]}>
        {lists.map((item, index) => (
          <Col span={8}>
            <AddCard color={colors[index]} item={item} onSubmit={handleAddCards} />
          </Col>
        ))}
      </Row>
      <Row gutter={[16, 16]} className="pb-10">
        {lists.map((item, index) => (
          <CardsList color={colors[index]} filters={filters} list={item} deleteCardSubmit={handleDeleteCard} editCardSubmit={handleEditCard} />
        ))}
      </Row>
    </div>
  );
};

export default BoardDetail;
