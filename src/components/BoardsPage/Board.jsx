import { Button, Card } from 'antd';
import React from 'react';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import EditBoard from './EditBoard';
const Board = props => {
  const { item, deleteBoardSubmit, editBoardSubmit, copyLinkSubmit, onClick } = props;
  return (
    <Card
      title={
        <div className="flex justify-between items-center">
          <div className="hover:underline" onClick={onClick}>
            {item.name}
          </div>
          <EditBoard item={item} editBoardSubmit={editBoardSubmit} />
        </div>
      }
      headStyle={{ fontSize: '1.5rem' }}
      hoverable
      className="h-48 border-solid border-purple-200"
      style={{ textAlign: 'center' }}
    >
      <div className="w-full flex flex-col items-start truncate">
        <div>
          <span className="font-bold pr-2">Created at:</span> {item.createdAt}
        </div>
        <div>
          <span className="font-bold pr-2">Lists number:</span> {item.lists.length}
        </div>
        <div className="flex flex-row justify-between pt-4 w-full self-center">
          <Button type="primary" size="small" className="flex items-center py-3" onClick={() => copyLinkSubmit(item._id)} icon={<CopyOutlined />}>
            copy url
          </Button>
          <Button type="danger" size="small" className="flex items-center py-3" icon={<DeleteOutlined />} onClick={() => deleteBoardSubmit(item._id)}>
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Board;
