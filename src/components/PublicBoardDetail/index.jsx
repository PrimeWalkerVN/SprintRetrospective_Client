import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../BoardDetail/NavBar';
import { Row, Col } from 'antd';
import boardsApi from '../../api/boardsApi';
import { setIsLoading } from '../../redux/reducers/loadingReducer';
import { useDispatch } from 'react-redux';
import Notification from '../GlobalComponents/Notification';
import CardsList from '../BoardDetail/CardsList';
import AddCard from '../BoardDetail/AddCard';
import listsApi from '../../api/listsApi';
import cardsApi from '../../api/cardsApi';

const PublicBoardDetail = () => {
  const params = useParams();
  const boardId = params.id;
  const colors = ['blue', 'green', 'purple', 'blue', 'green'];
  const styleLabel = 'text-xl font-bold flex justify-center w-full ';
  const [lists, setLists] = useState([]);
  const [filters, setFilters] = useState({ action: false });
  const [board, setBoard] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const getLists = async () => {
      dispatch(setIsLoading(true));
      try {
        const boardRes = await boardsApi.getOneBoard(boardId);
        setBoard(boardRes.data);
        const listsRes = await boardsApi.getLists(boardId);
        setLists(listsRes.data);
      } catch (err) {
        Notification('error', 'error', err.message);
      }
      dispatch(setIsLoading(false));
    };

    getLists();
  }, [boardId, dispatch]);

  const handleAddCards = async (id, params) => {
    dispatch(setIsLoading(true));
    try {
      await listsApi.addCard(id, params);
      setFilters({ action: !filters.action });
    } catch (err) {
      Notification('error', 'error', err.message);
    }
    dispatch(setIsLoading(false));
  };
  const handleEditCard = async (id, params) => {
    dispatch(setIsLoading(true));
    try {
      await cardsApi.editCard(id, params);
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

export default PublicBoardDetail;