import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import usersApi from '../../api/usersApi';
import Notification from '../GlobalComponents/Notification';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../../redux/reducers/loadingReducer';
import { setUserLogin } from '../../redux/reducers/userReducer';
import { Link, useHistory } from 'react-router-dom';
import facebookLogo from '../../assets/images/facebook.svg';
import googleLogo from '../../assets/images/google.svg';
import queryString from 'query-string';
const Login = () => {
  const history = useHistory();
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();
  const query = queryString.parse(history.location.search);

  const onSubmitHandler = async values => {
    dispatch(setIsLoading(true));
    try {
      const res = await usersApi.login(values);
      dispatch(setUserLogin(res.data));
      history.push(query.next);
      Notification('success', 'Hi', res.data.user.fullName);
    } catch (err) {
      if (err.response) setErrors(err.response.data.message.toString());
      else setErrors('Something went wrong!');
    }
    dispatch(setIsLoading(false));
  };

  const formItemLayout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 24
    }
  };
  return (
    <div className="w-full flex justify-center items-center h-screen bg-gray-100">
      <div className="w-1/4 box-border shadow-2xl px-10 flex flex-col items-center bg-white">
        <span className="text-4xl font-bold py-10">LOGIN</span>
        <Form name="basic" onFinish={onSubmitHandler} className="flex flex-col" {...formItemLayout} size="large">
          <Form.Item
            label="Username"
            labelAlign="left"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              },
              {
                min: 6,
                message: 'Username must be at least 6 characters!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelAlign="left"
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

          {errors && <Alert className="my-5" closable type="error" message="Error" description={errors} />}
          <Form.Item className="self-center w-full">
            <Button className="w-full rounded-lg" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="flex pb-5">
          <button className="w-12 h-12 mr-5">
            <a href={`${process.env.REACT_APP_API}/users/auth/facebook`}>
              <img src={facebookLogo} alt="facebook logo"></img>
            </a>
          </button>
          <button className="w-12 h-12">
            <a href={`${process.env.REACT_APP_API}/users/auth/google`}>
              <img src={googleLogo} alt="google logo"></img>
            </a>
          </button>
        </div>

        <Link className="pb-5 font-bold" to="/register">
          If you don't have account? Register!
        </Link>
      </div>
    </div>
  );
};

export default Login;
