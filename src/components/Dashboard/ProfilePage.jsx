import { Button, Form, Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usersApi from '../../api/usersApi';
import { setIsLoading } from '../../redux/reducers/loadingReducer';
import { setLogged, setUser } from '../../redux/reducers/userReducer';
import Notification from '../GlobalComponents/Notification';

const ProfilePage = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const onSubmitHandler = async params => {
    if (!params.fullName && !params.email) return;
    dispatch(setIsLoading(true));
    try {
      await usersApi.updateProfile(params);
      await dispatch(setUser(user));
      await dispatch(setLogged(true));
      Notification('success', 'Update profile', 'Success');
    } catch (err) {
      Notification('error', 'error', err.response.data.message);
    }
    dispatch(setIsLoading(false));
  };

  const formItemLayout = {
    labelCol: {
      span: 8
    }
  };
  return (
    <div className="w-full h-screen flex items-center flex-col">
      <span className="text-4xl font-bold py-10">Your Profile</span>
      <Form name="basic" onFinish={onSubmitHandler} className="flex flex-col" {...formItemLayout} size="large">
        <Form.Item
          label="Full-name"
          name="fullName"
          rules={[
            {
              min: 1,
              message: 'Please input your Full-name!'
            }
          ]}
        >
          <Input defaultValue={user.fullName.toString()} />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            }
          ]}
        >
          <Input defaultValue={user.email.toString()} />
        </Form.Item>

        <Form.Item className="self-center pt-10 w-full">
          <Button className="w-full" type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePage;
