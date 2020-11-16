import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import EditCard from './EditCard';

const styleCard = 'w-full text-lg transition duration-500 flex justify-center text-white py-2 mb-2 ';
const CardsList = props => {
  const { color, item, deleteCardSubmit, editCardSubmit } = props;

  return (
    <Droppable droppableId={item._id}>
      {provided => (
        <Col span={8} {...provided.droppableProps} ref={provided.innerRef}>
          {item.cards.map((item, index) => (
            <Draggable key={item._id} draggableId={item._id} index={index}>
              {provided => (
                <Row
                  key={item._id}
                  className={styleCard + `bg-${color}-600 flex flex-col px-2 truncate`}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <div className="w-full truncate text-center">{item.content}</div>
                  <div className="flex justify-end">
                    <EditCard item={item} editCardSubmit={editCardSubmit} />
                    <Button
                      type="danger"
                      size="small"
                      onClick={() => deleteCardSubmit(item._id)}
                      className="flex items-center justify-center py-3"
                      icon={<DeleteOutlined />}
                    />
                  </div>
                </Row>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Col>
      )}
    </Droppable>

    // <Col span={8}>
    //   {cards.map(item => (
    //     <Row className={styleCard + `bg-${color}-600 flex flex-col px-2`}>
    //       <div className="self-center">{item.content}</div>
    //       <div className="flex justify-end">
    //         <EditCard item={item} editCardSubmit={editCardSubmit} />
    //         <Button
    //           type="danger"
    //           size="small"
    //           className="flex items-center justify-center py-3"
    //           icon={<DeleteOutlined onClick={() => deleteCardSubmit(item._id)} />}
    //         />
    //       </div>
    //     </Row>
    //   ))}
    // </Col>
  );
};

export default CardsList;
