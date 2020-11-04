import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import usersApi from '../../api/usersApi';
import Notification from '../GlobalComponents/Notification';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../../redux/reducers/loadingReducer';
import { Link, useHistory } from 'react-router-dom';
const Register = () => {
  const history = useHistory();
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();
  const onSubmitHandler = async params => {
    dispatch(setIsLoading(true));
    delete params['confirm'];
    try {
      const res = await usersApi.register(params);
      history.push('/login');
      Notification('success', 'Register success', res.message);
    } catch (err) {
      if (err.response) setErrors(err.response.data.message.toString());
      else setErrors(err);
    }
    dispatch(setIsLoading(false));
  };

  const formItemLayout = {
    labelCol: {
      span: 10
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="w-1/4 box-border shadow-2xl px-6 flex flex-col items-center">
        <span className="text-4xl font-bold py-10">REGISTER</span>
        <Form name="basic" onFinish={onSubmitHandler} className="flex flex-col" {...formItemLayout} size="large">
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              },
              {
                min: 6,
                message: 'username must be at least 6 characters long'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Full-name"
            name="fullName"
            rules={[
              {
                required: true,
                message: 'Please input your Full-name!'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
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
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!'
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          {errors && <Alert className="my-5" closable type="error" message="Error" description={errors} />}
          <Form.Item className="self-center pt-10 w-full">
            <Button className="w-full" type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
        <Link className="pb-5 font-bold " to="/login">
          Already have account?
        </Link>
      </div>
    </div>
  );
};

export default Register;
