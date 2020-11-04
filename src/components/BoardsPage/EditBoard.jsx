import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';

const EditBoard = props => {
  const { editBoardSubmit, item } = props;
  const [editModal, setEditModal] = useState(false);
  const [form] = Form.useForm();
  const handleCancel = () => {
    setEditModal(false);
    form.resetFields();
  };

  const handleFinish = values => {
    if (values.name === item.name) {
      setEditModal(false);
      return;
    }
    editBoardSubmit(item._id, values);
    form.resetFields();
    setEditModal(false);
  };
  return (
    <div>
      <div className="text-lg text-blue-400 hover:text-blue-700" onClick={() => setEditModal(true)}>
        Edit
      </div>
      <Modal
        title="Edit Card"
        centered
        destroyOnClose
        visible={editModal}
        onCancel={handleCancel}
        okButtonProps={{ form: 'editForm', key: 'submit', htmlType: 'submit' }}
      >
        <Form id="editForm" form={form} name="edit_board" onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input name board'
              }
            ]}
          >
            <Input defaultValue={item.name} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditBoard;
