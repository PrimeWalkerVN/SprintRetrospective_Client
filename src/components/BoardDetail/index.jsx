import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import boardsApi from '../../api/boardsApi';
import cardsApi from '../../api/cardsApi';
import listsApi from '../../api/listsApi';
import { setIsLoading } from '../../redux/reducers/loadingReducer';
import Notification from '../GlobalComponents/Notification';
import AddCard from './AddCard';
import CardsList from './CardsList';
import NavBar from './NavBar';

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
        const lists = await Promise.all(
          listsRes.data.map(async item => {
            const data = await listsApi.getCards(item._id);
            const obj = { cards: data.data };
            return Object.assign(item, obj);
          })
        );
        setLists(lists);
      } catch (err) {
        Notification('error', 'error', err.response.data.message);
      }
      dispatch(setIsLoading(false));
    };

    getLists();
  }, [board, dispatch, filters]);

  const handleAddCards = async (id, params) => {
    dispatch(setIsLoading(true));
    try {
      const res = await listsApi.addCard(id, params);
      setLists(
        lists.map(item => {
          if (item._id === id) item.cards.push(res.data);
          return item;
        })
      );
    } catch (err) {
      Notification('error', 'error', err.response.data.message);
    }
    dispatch(setIsLoading(false));
  };
  const handleEditCard = (id, params) => {
    try {
      cardsApi.editCard(id, params);
    } catch (err) {
      Notification('error', 'error', err.message);
    }

    const data = lists.map(item => {
      return {
        ...item,
        cards: item.cards.map(card => (card._id === id ? { ...card, content: params.content } : card))
      };
    });
    setLists(data);
  };
  const handleDeleteCard = id => {
    try {
      cardsApi.deleteCard(id);
    } catch (err) {
      Notification('error', 'error', err.response.data.message);
    }
    const data = lists.map(item => {
      return {
        ...item,
        cards: item.cards.filter(card => {
          return card._id !== id;
        })
      };
    });

    setLists(data);
  };

  const ondragEnd = result => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const items = reorder(getCardsOnList(source.droppableId), source.index, destination.index);
      setLists(
        lists.map(item => {
          if (item._id === source.droppableId) item.cards = items;
          return item;
        })
      );
    } else {
      const result = move(getCardsOnList(source.droppableId), getCardsOnList(destination.droppableId), source, destination);
      setLists(
        lists.map(item => {
          if (item._id === source.droppableId) item.cards = result.source;
          if (item._id === destination.droppableId) item.cards = result.dest;
          return item;
        })
      );
    }
  };

  const getCardsOnList = id => lists.find(item => item._id === id).cards;

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
        <DragDropContext onDragEnd={ondragEnd}>
          {lists.map((item, index) => (
            <CardsList color={colors[index]} filters={filters} item={item} deleteCardSubmit={handleDeleteCard} editCardSubmit={handleEditCard} />
          ))}
        </DragDropContext>
      </Row>
    </div>
  );
};

export default BoardDetail;

//Extra function
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result.map((item, index) => {
    cardsApi.editCard(item._id, { order: index });
    item.order = index;
    return item;
  });
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  cardsApi.editCard(removed._id, { listId: droppableDestination.droppableId });

  const result = {};
  result['source'] = sourceClone.map((item, index) => {
    item.order = index;
    cardsApi.editCard(item._id, { order: index });
    return item;
  });
  result['dest'] = destClone.map((item, index) => {
    item.order = index;
    cardsApi.editCard(item._id, { order: index });
    return item;
  });

  return result;
};
