import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, List, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import listsApi from '../../api/listsApi';
import { setIsLoading } from '../../redux/reducers/loadingReducer';
import Notification from '../Notification';

const styleCard = 'w-full text-lg transition duration-500 flex justify-center text-white py-2 mb-2 ';
const CardsList = props => {
  const { color, list, filters, deleteCardSubmit } = props;
  const [cards, setCards] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getCards = async () => {
      dispatch(setIsLoading(true));
      try {
        if (!list) return;
        const res = await listsApi.getCards(list._id);
        setCards(res.data);
      } catch (err) {
        Notification('error', 'error', err.message);
      }
      dispatch(setIsLoading(false));
    };

    getCards();
  }, [filters, list, dispatch]);
  return (
    <Col span={8}>
      {/* <List
        className="overflow-y-scroll"
        dataSource={cards}
        renderItem={item => <Row className={styleCard + `bg-${color}-600`}>{item.content}</Row>}
      /> */}
      {cards.map(item => (
        <Row className={styleCard + `bg-${color}-600 flex flex-col px-2`}>
          <div className="self-center">{item.content}</div>
          <div className="flex justify-end">
            <Button
              type="ghost"
              size="small"
              className="flex items-center py-3 justify-center mr-3 text-white hover:bg-pink-300"
              icon={<EditOutlined />}
            />
            <Button
              type="danger"
              size="small"
              className="flex items-center justify-center py-3"
              icon={<DeleteOutlined onClick={() => deleteCardSubmit(item._id)} />}
            />
          </div>
        </Row>
      ))}
    </Col>
  );
};

export default CardsList;
