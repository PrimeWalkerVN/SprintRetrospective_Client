import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRouteAuth = ({ component: Component, ...rest }) => {
  const logged = useSelector(state => state.user.logged);
  const user = useSelector(state => state.user.user);
  const isUser = logged && user;
  return (
    <Route
      {...rest}
      render={props => {
        return !isUser ? <Component {...props} /> : <Redirect to="/dashboard"></Redirect>;
      }}
    ></Route>
  );
};

export default PrivateRouteAuth;
