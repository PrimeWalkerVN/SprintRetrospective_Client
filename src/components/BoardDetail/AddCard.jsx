import { Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
const styleButton = 'w-full text-xl font-bold transition duration-500 flex justify-center ';
const AddCard = props => {
  const { color, onSubmit, item } = props;
  const [addModal, setAddModal] = useState(false);
  const [form] = Form.useForm();
  const handleCancel = () => {
    setAddModal(false);
    form.resetFields();
  };

  const handleFinish = values => {
    onSubmit(item._id, values);
    form.resetFields();
    setAddModal(false);
  };
  return (
    <div>
      <button className={styleButton + `bg-${color}-100 hover:bg-red-200`} onClick={() => setAddModal(true)}>
        +
      </button>
      <Modal
        title="Add Card"
        centered
        visible={addModal}
        onCancel={handleCancel}
        okButtonProps={{ form: 'addForm', key: 'submit', htmlType: 'submit' }}
      >
        <Form id="addForm" form={form} name="add_card" onFinish={handleFinish}>
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
            <Input placeholder="Please input Content" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddCard;
