import { List } from 'antd';
import React from 'react';
import Board from './Board';

const ListBoard = props => {
  const { data, deleteBoardSubmit } = props;

  return (
    <div className="w-full">
      <List
        grid={{ gutter: 16, column: 4 }}
        pagination={{ defaultPageSize: 8 }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Board item={item} deleteBoardSubmit={deleteBoardSubmit} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ListBoard;
