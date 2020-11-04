import { EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';

const EditCard = props => {
  const { editCardSubmit, item } = props;
  const [editModal, setEditModal] = useState(false);
  const [form] = Form.useForm();
  const handleCancel = () => {
    setEditModal(false);
    form.resetFields();
  };

  const handleFinish = values => {
    if (values.content === item.content) {
      setEditModal(false);
      return;
    }
    editCardSubmit(item._id, values);
    form.resetFields();
    setEditModal(false);
  };
  return (
    <div>
      <Button
        onClick={() => setEditModal(true)}
        type="ghost"
        size="small"
        className="flex items-center py-3 justify-center mr-3 text-white hover:bg-pink-300"
        icon={<EditOutlined />}
      />
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
            name="content"
            label="Content"
            rules={[
              {
                required: true,
                message: 'Please input content card'
              }
            ]}
          >
            <Input defaultValue={item.content} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditCard;
