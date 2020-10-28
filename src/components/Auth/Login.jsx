import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import usersApi from '../../api/usersApi';
import Notification from '../Notification';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../../redux/reducers/loadingReducer';
import { setUser } from '../../redux/reducers/userReducer';
import { useHistory } from 'react-router-dom';
const Login = () => {
  const history = useHistory();
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();
  const onSubmitHandler = async values => {
    dispatch(setIsLoading(true));
    try {
      const res = await usersApi.login(values);
      dispatch(setUser(res.data));
      history.push('/dashboard');
      Notification('success', 'Login', res.status);
    } catch (err) {
      if (err.response) setErrors(err.response.data.message);
      else setErrors(err);
    }
    dispatch(setIsLoading(false));
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="w-1/4 box-border shadow-2xl p-20">
        <Form name="basic" onFinish={onSubmitHandler}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          {errors && <Alert closable type="error" message="Error" description={errors} />}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
