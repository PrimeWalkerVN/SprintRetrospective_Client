import { Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';

const AddBoard = props => {
  const { color, handleSubmit } = props;
  const [addModal, setAddModal] = useState(false);
  const colorBorder = `border-${color}-700 `;
  const colorBg = `bg-${color}-700 `;
  const colorText = `text-${color}-700 `;

  const [form] = Form.useForm();
  const handleCancel = () => {
    setAddModal(false);
  };

  const handleFinish = values => {
    handleSubmit(values);
    form.resetFields();
    setAddModal(false);
  };

  return (
    <div className={colorBorder + 'w-64 border-dashed border-2 flex flex-col items-center justify-center h-48'}>
      <button className={colorBg + 'rounded-full text-white text-2xl h-16 w-16 cursor-pointer'} onClick={() => setAddModal(true)}>
        +
      </button>
      <div className={colorText + 'text-lg'}>Add board</div>
      <Modal
        title="Add Board"
        centered
        visible={addModal}
        onCancel={handleCancel}
        okButtonProps={{ form: 'addForm', key: 'submit', htmlType: 'submit' }}
      >
        <Form id="addForm" form={form} name="add_board" onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input name board'
              },
              {
                min: 3,
                message: 'Name board must be at least 3 character!'
              }
            ]}
          >
            <Input placeholder="Please input board name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddBoard;
