import { List } from 'antd';
import React, { useEffect, useState } from 'react';
import Board from './Board';
import boardsApi from '../../api/boardsApi';
import Loading from '../Loading';
import Notification from '../Notification';
const ListBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const getBoards = async () => {
      try {
        const boardsRes = await boardsApi.getBoards();
        setBoards(boardsRes.data);
      } catch (err) {
        Notification('error', 'error', err.message);
      }
    };
    setIsLoading(true);
    getBoards();
    setIsLoading(false);
  }, []);
  return (
    <div className="w-full">
      <div>{isLoading && <Loading />}</div>
      <List
        grid={{ gutter: 16, column: 4 }}
        pagination={{ defaultPageSize: 8 }}
        dataSource={boards}
        renderItem={item => (
          <List.Item>
            <Board item={item} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ListBoard;
