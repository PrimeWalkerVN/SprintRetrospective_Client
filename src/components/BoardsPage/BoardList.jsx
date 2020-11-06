import { List } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Board from './Board';

const BoardList = props => {
  const { data, deleteBoardSubmit, editBoardSubmit, copyLinkSubmit } = props;
  const history = useHistory();

  const clickDetailHandler = item => {
    history.push({ pathname: '/dashboard/detail', state: { board: item } });
  };
  return (
    <div className="w-full">
      <List
        grid={{ gutter: 16, column: 4 }}
        pagination={{ defaultPageSize: 8 }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Board
              item={item}
              deleteBoardSubmit={deleteBoardSubmit}
              copyLinkSubmit={copyLinkSubmit}
              editBoardSubmit={editBoardSubmit}
              onClick={() => clickDetailHandler(item)}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default BoardList;
